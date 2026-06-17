export const APP_NAME = '旅行口說教練'
export const CONTACT_EMAIL = 'iverson14713@gmail.com'
export const LEGAL_UPDATED_AT = '2026 年 6 月 17 日'

export const LEGAL_ROUTES = {
  privacy: '/privacy',
  terms: '/terms',
  support: '/support',
  deleteData: '/delete-data',
} as const

export type LegalRouteId = keyof typeof LEGAL_ROUTES

export function matchLegalRoute(pathname: string): LegalRouteId | null {
  const normalized = pathname.replace(/\/$/, '') || '/'
  switch (normalized) {
    case LEGAL_ROUTES.privacy:
      return 'privacy'
    case LEGAL_ROUTES.terms:
      return 'terms'
    case LEGAL_ROUTES.support:
      return 'support'
    case LEGAL_ROUTES.deleteData:
      return 'deleteData'
    default:
      return null
  }
}
