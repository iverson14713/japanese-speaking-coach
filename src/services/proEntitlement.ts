import { Capacitor } from '@capacitor/core'
import type { CoachPlan } from '../services/ai/types'
import { PRO_PRODUCT_ID_LIST, PRO_PRODUCT_IDS, PRO_PRICE_FALLBACK, type ProProductDisplayPrices, type ProProductId } from '../constants/proProducts'
import { isAiCoachDebugMode } from '../utils/aiCoachDebugMode'

const ENTITLEMENT_STORAGE_KEY = 'travel-speaking-coach-pro-entitlement'
const DEBUG_PRO_STORAGE_KEY = 'travel-speaking-coach-debug-pro'

export type PurchaseOutcome =
  | { status: 'success'; message: string }
  | { status: 'cancelled' }
  | { status: 'not_available'; message: string }
  | { status: 'failed'; message: string }

export type RestoreOutcome =
  | { status: 'restored'; message: string }
  | { status: 'none'; message: string }
  | { status: 'failed'; message: string }

interface StoredEntitlement {
  isPro: boolean
  source: 'purchase' | 'restore' | 'mock'
  updatedAt: number
  productId?: ProProductId
}

type ProStatusListener = (isPro: boolean) => void

const listeners = new Set<ProStatusListener>()

function notifyListeners(isPro: boolean): void {
  listeners.forEach((listener) => listener(isPro))
}

function loadStoredEntitlement(): StoredEntitlement | null {
  try {
    const raw = localStorage.getItem(ENTITLEMENT_STORAGE_KEY)
    if (!raw) {
      return null
    }
    return JSON.parse(raw) as StoredEntitlement
  } catch {
    return null
  }
}

function saveStoredEntitlement(data: StoredEntitlement): void {
  try {
    localStorage.setItem(ENTITLEMENT_STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Ignore quota / private mode errors
  }
  notifyListeners(getProStatus())
}

export function subscribeProStatus(listener: ProStatusListener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function isNativeIosApp(): boolean {
  return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios'
}

export function isNativePurchasesAvailable(): boolean {
  return Capacitor.isNativePlatform()
}

function isDebugProEnabled(): boolean {
  if (!isAiCoachDebugMode()) {
    return false
  }
  try {
    return localStorage.getItem(DEBUG_PRO_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function getProStatus(): boolean {
  if (isDebugProEnabled()) {
    return true
  }
  return loadStoredEntitlement()?.isPro === true
}

export function getCoachPlan(): CoachPlan {
  return getProStatus() ? 'pro' : 'free'
}

export function setProStatus(isPro: boolean): void {
  if (!isAiCoachDebugMode()) {
    return
  }
  try {
    if (isPro) {
      localStorage.setItem(DEBUG_PRO_STORAGE_KEY, 'true')
    } else {
      localStorage.removeItem(DEBUG_PRO_STORAGE_KEY)
    }
  } catch {
    // Ignore
  }
  notifyListeners(getProStatus())
}

function isProProductId(productId: string): productId is ProProductId {
  return PRO_PRODUCT_ID_LIST.includes(productId as ProProductId)
}

function isPurchaseCancelledError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error)
  return (
    /cancel/i.test(message) ||
    message.includes('UserCancelled') ||
    message.includes('SKErrorDomain error 2') ||
    message.includes('E_USER_CANCELLED')
  )
}

function isProductMissingError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error)
  return /not found|invalid product|ProductNotFound|No products|unable to find/i.test(message)
}

async function loadNativePurchasesModule() {
  return import('@capgo/native-purchases')
}

async function hasActiveNativeSubscription(): Promise<boolean> {
  if (!isNativePurchasesAvailable()) {
    return false
  }

  try {
    const { NativePurchases, PURCHASE_TYPE } = await loadNativePurchasesModule()
    const { purchases } = await NativePurchases.getPurchases({ productType: PURCHASE_TYPE.SUBS })

    return purchases.some((purchase) => {
      if (!isProProductId(purchase.productIdentifier)) {
        return false
      }
      if (purchase.isActive === false) {
        return false
      }
      if (purchase.expirationDate) {
        const expiration = new Date(purchase.expirationDate)
        if (expiration.getTime() <= Date.now()) {
          return false
        }
      }
      return true
    })
  } catch {
    return false
  }
}

export async function refreshProStatus(): Promise<boolean> {
  if (isNativePurchasesAvailable()) {
    const active = await hasActiveNativeSubscription()
    if (active) {
      saveStoredEntitlement({
        isPro: true,
        source: 'restore',
        updatedAt: Date.now(),
      })
    } else if (!isDebugProEnabled()) {
      saveStoredEntitlement({
        isPro: false,
        source: 'restore',
        updatedAt: Date.now(),
      })
    }
  }

  return getProStatus()
}

async function purchaseProduct(productId: ProProductId): Promise<PurchaseOutcome> {
  if (!isNativePurchasesAvailable()) {
    if (isAiCoachDebugMode()) {
      saveStoredEntitlement({
        isPro: true,
        source: 'mock',
        updatedAt: Date.now(),
        productId,
      })
      return { status: 'success', message: '測試模式：已模擬升級 Pro' }
    }
    return { status: 'not_available', message: '請在 iOS App 中完成購買' }
  }

  try {
    const { NativePurchases, PURCHASE_TYPE } = await loadNativePurchasesModule()
    const { isBillingSupported } = await NativePurchases.isBillingSupported()
    if (!isBillingSupported) {
      return { status: 'not_available', message: '此裝置不支援 App 內購買' }
    }

    try {
      await NativePurchases.getProduct({
        productIdentifier: productId,
        productType: PURCHASE_TYPE.SUBS,
      })
    } catch (error) {
      if (isProductMissingError(error)) {
        return { status: 'not_available', message: '商品尚未上架，請稍後再試' }
      }
      return { status: 'failed', message: '商品載入失敗，請稍後再試' }
    }

    await NativePurchases.purchaseProduct({
      productIdentifier: productId,
      productType: PURCHASE_TYPE.SUBS,
    })

    saveStoredEntitlement({
      isPro: true,
      source: 'purchase',
      updatedAt: Date.now(),
      productId,
    })
    return { status: 'success', message: '已成功升級 Pro' }
  } catch (error) {
    if (isPurchaseCancelledError(error)) {
      return { status: 'cancelled' }
    }
    if (isProductMissingError(error)) {
      return { status: 'not_available', message: '找不到商品，請確認 App Store 設定' }
    }
    return { status: 'failed', message: '付款失敗，請稍後再試' }
  }
}

export function purchaseMonthly(): Promise<PurchaseOutcome> {
  return purchaseProduct(PRO_PRODUCT_IDS.monthly)
}

export function purchaseYearly(): Promise<PurchaseOutcome> {
  return purchaseProduct(PRO_PRODUCT_IDS.yearly)
}

function formatSubscriptionPrice(priceString: string, periodLabel: string): string {
  const trimmed = priceString.trim()
  if (!trimmed) {
    return periodLabel === '月' ? PRO_PRICE_FALLBACK.monthly : PRO_PRICE_FALLBACK.yearly
  }
  if (trimmed.includes('/')) {
    return trimmed
  }
  return `${trimmed} / ${periodLabel}`
}

function getFallbackProPrices(): ProProductDisplayPrices {
  return {
    monthly: PRO_PRICE_FALLBACK.monthly,
    yearly: PRO_PRICE_FALLBACK.yearly,
    yearlySavingsLabel: PRO_PRICE_FALLBACK.yearlySavingsLabel,
  }
}

/** Prefer StoreKit localized prices; fall back to TW display prices on web. */
export async function fetchProProductPrices(): Promise<ProProductDisplayPrices> {
  if (!isNativePurchasesAvailable()) {
    return getFallbackProPrices()
  }

  try {
    const { NativePurchases, PURCHASE_TYPE } = await loadNativePurchasesModule()
    const { products } = await NativePurchases.getProducts({
      productIdentifiers: [...PRO_PRODUCT_ID_LIST],
      productType: PURCHASE_TYPE.SUBS,
    })

    const monthlyProduct = products.find(
      (product) =>
        product.identifier === PRO_PRODUCT_IDS.monthly ||
        product.planIdentifier === PRO_PRODUCT_IDS.monthly,
    )
    const yearlyProduct = products.find(
      (product) =>
        product.identifier === PRO_PRODUCT_IDS.yearly ||
        product.planIdentifier === PRO_PRODUCT_IDS.yearly,
    )

    return {
      monthly: monthlyProduct?.priceString
        ? formatSubscriptionPrice(monthlyProduct.priceString, '月')
        : PRO_PRICE_FALLBACK.monthly,
      yearly: yearlyProduct?.priceString
        ? formatSubscriptionPrice(yearlyProduct.priceString, '年')
        : PRO_PRICE_FALLBACK.yearly,
      yearlySavingsLabel: PRO_PRICE_FALLBACK.yearlySavingsLabel,
    }
  } catch {
    return getFallbackProPrices()
  }
}

export async function restorePurchases(): Promise<RestoreOutcome> {
  if (!isNativePurchasesAvailable()) {
    if (isAiCoachDebugMode() && getProStatus()) {
      return { status: 'restored', message: '測試模式：已恢復 Pro 狀態' }
    }
    return { status: 'failed', message: '請在 iOS App 中恢復購買' }
  }

  try {
    const { NativePurchases } = await loadNativePurchasesModule()
    await NativePurchases.restorePurchases()

    const active = await hasActiveNativeSubscription()
    if (active) {
      saveStoredEntitlement({
        isPro: true,
        source: 'restore',
        updatedAt: Date.now(),
      })
      return { status: 'restored', message: '已成功恢復 Pro' }
    }

    if (!isDebugProEnabled()) {
      saveStoredEntitlement({
        isPro: false,
        source: 'restore',
        updatedAt: Date.now(),
      })
    }

    return { status: 'none', message: '找不到可恢復的購買' }
  } catch {
    return { status: 'failed', message: '恢復購買失敗，請稍後再試' }
  }
}

export async function initializeProEntitlement(): Promise<boolean> {
  if (!isNativePurchasesAvailable()) {
    return getProStatus()
  }

  try {
    const { NativePurchases } = await loadNativePurchasesModule()
    await NativePurchases.addListener('transactionUpdated', () => {
      void refreshProStatus()
    })
  } catch {
    // Listener is iOS-only; ignore on unsupported platforms.
  }

  return refreshProStatus()
}
