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

export function PrivacyPage() {
  return (
    <LegalPageLayout title="隱私權政策" updatedAt={LEGAL_UPDATED_AT}>
      <Section title="1. 簡介">
        <p>
          歡迎使用「旅行口說教練」。我們重視你的隱私。本隱私權政策說明本 App
          可能收集、使用、保存與處理的資料，以及你可以如何管理自己的資料。
        </p>
      </Section>

      <Section title="2. 我們可能收集或處理的資料">
        <p>本 App 可能處理以下資料：</p>
        <ul>
          <li>使用者輸入的文字內容</li>
          <li>語音辨識後產生的文字</li>
          <li>AI 教練對話內容</li>
          <li>學習語言設定</li>
          <li>今日練習紀錄</li>
          <li>句庫收藏資料（若你使用收藏功能）</li>
          <li>AI 教練使用次數</li>
          <li>App 使用狀態，例如錯誤紀錄、基本操作狀態、裝置或瀏覽器環境資訊</li>
        </ul>
        <p>
          目前 App 不需要註冊帳號即可使用。部分資料可能只儲存在使用者裝置的
          localStorage 或瀏覽器儲存空間中。
        </p>
      </Section>

      <Section title="3. 語音資料">
        <ul>
          <li>使用者可以使用語音輸入進行口說練習。</li>
          <li>語音輸入主要用於轉成文字，讓 AI 教練產生回覆與教學內容。</li>
          <li>App 不會主動保存原始錄音檔。</li>
          <li>
            若使用瀏覽器或系統內建語音辨識服務，語音辨識可能由裝置、瀏覽器或系統服務處理。
          </li>
          <li>若未來改用第三方語音辨識服務，會更新本隱私權政策。</li>
        </ul>
      </Section>

      <Section title="4. AI 服務">
        <ul>
          <li>
            使用者輸入的文字、語音辨識後文字、對話上下文，可能會被傳送至第三方 AI
            服務，用於產生 AI 教練回覆。
          </li>
          <li>AI 回覆僅供語言學習、旅行口說練習與情境模擬參考。</li>
          <li>
            使用者不應輸入敏感個人資料，例如身分證字號、護照號碼、信用卡資料、密碼、醫療紀錄、私人地址等。
          </li>
          <li>AI 可能產生不完全正確的內容，使用者在重要情境下仍應自行確認。</li>
        </ul>
      </Section>

      <Section title="5. 第三方服務">
        <p>本 App 可能使用以下第三方服務：</p>
        <ul>
          <li>OpenAI：用於 AI 回覆生成</li>
          <li>Vercel：用於網站與 API hosting</li>
          <li>
            Apple App Store：若 App 透過 iOS App Store 發布，下載、付款、訂閱與退款可能由
            Apple 處理
          </li>
        </ul>
        <p>未來若新增其他第三方服務，我們會更新本政策。</p>
      </Section>

      <Section title="6. 資料用途">
        <p>資料可能用於：</p>
        <ul>
          <li>提供 AI 口說教練功能</li>
          <li>提供句庫、今日練習、語音輸入與朗讀功能</li>
          <li>保存學習設定與本機練習狀態</li>
          <li>管理免費與 Pro 使用限制</li>
          <li>改善 App 體驗</li>
          <li>偵錯、安全維護與服務穩定性</li>
        </ul>
      </Section>

      <Section title="7. 資料保存">
        <ul>
          <li>部分資料可能保存在使用者裝置 localStorage 或瀏覽器儲存空間。</li>
          <li>若未登入或沒有帳號系統，這些資料通常不會綁定到雲端帳號。</li>
          <li>刪除 App、移除 PWA、清除瀏覽器網站資料，可能會刪除本機資料。</li>
          <li>App 不會主動保存原始錄音檔。</li>
          <li>AI 對話文字可能會為了提供上下文與教學功能暫時保存在本機。</li>
        </ul>
      </Section>

      <Section title="8. 使用者如何管理資料">
        <p>使用者可以透過以下方式管理或刪除資料：</p>
        <ul>
          <li>使用 App 內「清除對話」功能刪除 AI 教練聊天紀錄</li>
          <li>取消收藏或清除收藏句子（若有使用收藏功能）</li>
          <li>刪除 App 或從主畫面移除 PWA</li>
          <li>清除瀏覽器網站資料</li>
          <li>
            聯絡開發者提出資料相關問題（
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>）
          </li>
        </ul>
      </Section>

      <Section title="9. 兒童隱私">
        <p>
          本 App 並非特別針對 13 歲以下兒童設計。若你是未成年人，請在父母或監護人同意下使用本
          App。
        </p>
      </Section>

      <Section title="10. 使用者權利">
        <p>
          使用者可以聯絡我們，要求查詢、更正或刪除與自己相關的資料。由於目前 App
          多數資料可能保存在使用者裝置本機，部分資料需由使用者自行透過 App 或瀏覽器設定刪除。
        </p>
      </Section>

      <Section title="11. 政策更新">
        <p>
          我們可能會因功能調整、法規要求或第三方服務變更而更新本隱私權政策。更新後會在本頁面顯示最新日期。
        </p>
      </Section>

      <Section title="12. 聯絡方式">
        <p>
          如有隱私相關問題，請聯絡：
          <br />
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </Section>
    </LegalPageLayout>
  )
}
