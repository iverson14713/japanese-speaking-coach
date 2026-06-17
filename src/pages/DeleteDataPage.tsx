import type { ReactNode } from 'react'
import { CONTACT_EMAIL, LEGAL_UPDATED_AT } from '../constants/legal'
import { LegalPageLayout } from '../components/legal/LegalPageLayout'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="legal-section">
      <h2 className="legal-section__title">{title}</h2>
      <div className="legal-section__body">{children}</div>
    </section>
  )
}

export function DeleteDataPage() {
  return (
    <LegalPageLayout title="刪除本機資料說明" updatedAt={LEGAL_UPDATED_AT}>
      <Section title="1. 無帳號系統說明">
        <p>
          目前「旅行口說教練」不需要註冊帳號即可使用，因此 App 內沒有帳號刪除功能。本頁說明的是如何刪除儲存在你裝置上的本機資料。
        </p>
      </Section>

      <Section title="2. 可能儲存在本機的資料">
        <ul>
          <li>學習語言設定</li>
          <li>今日練習紀錄</li>
          <li>AI 教練對話紀錄</li>
          <li>收藏句子（若有使用收藏功能）</li>
          <li>免費使用次數紀錄</li>
          <li>首次導覽是否已看過</li>
          <li>測試模式或其他本機設定</li>
        </ul>
      </Section>

      <Section title="3. 如何刪除本機資料">
        <ol>
          <li>在 AI 教練頁面點選「清除對話」，刪除目前語言與模式的聊天紀錄。</li>
          <li>如果有收藏功能，可以取消收藏或清除收藏。</li>
          <li>刪除 App 或從 iPhone 主畫面移除 PWA。</li>
          <li>在瀏覽器設定中清除本網站的網站資料。</li>
          <li>如果你使用的是 iOS Safari，可以到 Safari 設定中清除網站資料。</li>
        </ol>
      </Section>

      <Section title="4. 聯絡方式">
        <p>如果你對資料刪除有任何問題，請聯絡：</p>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </Section>
    </LegalPageLayout>
  )
}
