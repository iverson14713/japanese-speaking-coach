import type { ReactNode } from 'react'
import { CONTACT_EMAIL } from '../constants/legal'
import { LegalPageLayout } from '../components/legal/LegalPageLayout'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="legal-section">
      <h2 className="legal-section__title">{title}</h2>
      <div className="legal-section__body">{children}</div>
    </section>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="legal-faq">
      <h3 className="legal-faq__question">{question}</h3>
      <p className="legal-faq__answer">{answer}</p>
    </div>
  )
}

export function SupportPage() {
  return (
    <LegalPageLayout title="支援與聯絡我們">
      <Section title="1. 聯絡方式">
        <p>如果你在使用「旅行口說教練」時遇到問題，或有功能建議，請聯絡我們：</p>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </Section>

      <Section title="2. 常見問題">
        <FaqItem
          question="Q1：AI 教練無法回覆怎麼辦？"
          answer="請確認網路連線是否正常，稍後再試。如果仍無法使用，請截圖錯誤畫面並聯絡我們。"
        />
        <FaqItem
          question="Q2：語音輸入無法使用怎麼辦？"
          answer="請確認瀏覽器或裝置是否允許麥克風權限。部分裝置、瀏覽器或 PWA 環境可能不支援語音辨識，這時可以先使用打字輸入。"
        />
        <FaqItem
          question="Q3：AI 回覆不自然或語言錯誤怎麼辦？"
          answer="AI 回覆可能偶爾不完全正確。你可以重新輸入、改用中文描述想表達的意思，或聯絡我們回報問題。"
        />
        <FaqItem
          question="Q4：如何清除 AI 教練對話？"
          answer="請在 AI 教練頁面使用「清除對話」功能。若要刪除更多本機資料，可以刪除 App、移除 PWA 或清除瀏覽器網站資料。"
        />
        <FaqItem
          question="Q5：為什麼語音辨識結果不準？"
          answer="語音辨識可能受到環境噪音、口音、裝置麥克風、系統語音辨識服務影響。你可以手動修改辨識文字後再送出。"
        />
        <FaqItem
          question="Q6：如何取消 Pro 或付費訂閱？"
          answer="若未來提供 App Store 訂閱，請至 iPhone 的 Apple ID 訂閱管理頁面取消。付款與退款由 Apple App Store 依其規則處理。"
        />
      </Section>
    </LegalPageLayout>
  )
}
