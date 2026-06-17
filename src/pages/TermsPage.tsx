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

export function TermsPage() {
  return (
    <LegalPageLayout title="服務條款" updatedAt={LEGAL_UPDATED_AT}>
      <Section title="1. 服務說明">
        <p>
          「旅行口說教練」提供英文、日文、韓文旅行口說句庫、今日練習、AI
          口說教練、自由聊天、情境練習、語音輸入與語音朗讀等語言學習功能。
        </p>
      </Section>

      <Section title="2. 使用資格">
        <p>
          使用本 App 即表示你同意本服務條款。若你不同意本條款，請停止使用本 App。未成年人應在父母或監護人同意下使用。
        </p>
      </Section>

      <Section title="3. 使用限制">
        <p>使用者不得：</p>
        <ul>
          <li>濫用 AI 功能或大量自動化請求</li>
          <li>輸入違法、有害、騷擾、仇恨、暴力、色情、侵犯他人權利的內容</li>
          <li>嘗試攻擊、干擾、破解或逆向工程本服務</li>
          <li>使用自動化工具大量消耗 AI 或伺服器資源</li>
          <li>將本 App 用於違法或未經授權的用途</li>
        </ul>
      </Section>

      <Section title="4. AI 內容免責">
        <ul>
          <li>AI 回覆可能不完全正確、完整或符合所有情境。</li>
          <li>AI 內容僅供語言學習、旅行口說練習與情境模擬參考。</li>
          <li>
            使用者在旅行、簽證、醫療、法律、財務、安全等重要情境下，應自行確認資訊。
          </li>
          <li>本 App 不提供法律、醫療、財務、簽證或官方旅行建議。</li>
        </ul>
      </Section>

      <Section title="5. 語音功能">
        <p>
          語音輸入與語音朗讀功能可能受到裝置、瀏覽器、系統權限、網路環境影響。若語音辨識結果不準確，使用者可以手動修改文字後再送出。
        </p>
      </Section>

      <Section title="6. Pro / 付費功能">
        <p>
          若本 App 提供 Pro、訂閱或其他付費功能，實際價格、期限、可用功能、續訂與取消方式，以 App
          Store 或相應平台顯示為準。付款、取消訂閱與退款由 Apple App Store
          或相應平台依其規則處理。免費功能與 Pro 功能可能依版本、成本與營運需求調整。
        </p>
      </Section>

      <Section title="7. 免費使用限制">
        <p>
          本 App 可能對 AI 教練、語音功能、收藏數量或其他功能設置免費使用限制。限制內容可能依版本調整。
        </p>
      </Section>

      <Section title="8. 服務變更與中斷">
        <p>
          我們可能因維護、成本、功能調整、第三方服務限制或其他原因，修改、暫停或終止部分功能。若第三方
          AI、hosting 或語音服務異常，可能影響 App 使用。
        </p>
      </Section>

      <Section title="9. 本機資料">
        <p>
          目前 App 不一定需要註冊帳號即可使用。部分資料可能只保存在使用者裝置中，例如學習設定、收藏句子、AI
          對話紀錄、首次導覽狀態、免費使用次數。刪除 App、移除 PWA 或清除瀏覽器資料可能導致資料消失。
        </p>
      </Section>

      <Section title="10. 智慧財產權">
        <p>
          本 App 的介面、設計、內容、資料整理與功能邏輯，除第三方素材或服務外，屬於開發者或權利人所有。未經授權不得複製、散布、改作或用於商業用途。
        </p>
      </Section>

      <Section title="11. 責任限制">
        <p>
          在法律允許範圍內，開發者不對因使用或無法使用本 App 所造成的間接、附帶、特殊或衍生損失負責。
        </p>
      </Section>

      <Section title="12. 條款更新">
        <p>
          我們可能不定期更新本服務條款。更新後會在本頁顯示最新日期。使用者繼續使用本 App，即表示同意更新後的條款。
        </p>
      </Section>

      <Section title="13. 聯絡方式">
        <p>
          如有條款相關問題，請聯絡：
          <br />
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </Section>
    </LegalPageLayout>
  )
}
