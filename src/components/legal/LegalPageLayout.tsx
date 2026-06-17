import type { ReactNode } from 'react'
import { APP_NAME } from '../../constants/legal'

interface LegalPageLayoutProps {
  title: string
  updatedAt?: string
  children: ReactNode
}

export function LegalPageLayout({ title, updatedAt, children }: LegalPageLayoutProps) {
  return (
    <div className="legal-page">
      <div className="legal-page__inner">
        <header className="legal-page__header">
          <p className="legal-page__app-name">{APP_NAME}</p>
          <h1 className="legal-page__title">{title}</h1>
        </header>

        <article className="legal-page__card">{children}</article>

        <footer className="legal-page__footer">
          {updatedAt ? <p className="legal-page__updated">更新日期：{updatedAt}</p> : null}
          <a className="legal-page__back" href="/">
            返回 App
          </a>
        </footer>
      </div>
    </div>
  )
}
