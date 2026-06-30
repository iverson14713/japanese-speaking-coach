import type { ComponentType } from 'react'
import { DialogueTabIcon } from './icons/DialogueTabIcon'

export type AppTab = 'today' | 'library' | 'dialogue' | 'coach'

interface BottomTabBarProps {
  activeTab: AppTab
  onTabChange: (tab: AppTab) => void
}

type TabIconComponent = ComponentType<{ className?: string }>

interface TabConfig {
  id: AppTab
  label: string
  icon?: string
  Icon?: TabIconComponent
}

const TABS: TabConfig[] = [
  { id: 'today', label: '今日', icon: '🔥' },
  { id: 'library', label: '句庫', icon: '📖' },
  { id: 'dialogue', label: '情境', Icon: DialogueTabIcon },
  { id: 'coach', label: '教練', icon: '🎧' },
]

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  return (
    <nav className="bottom-tab-bar" aria-label="主要導覽">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id
        const TabIcon = tab.Icon

        return (
          <button
            key={tab.id}
            type="button"
            className={`bottom-tab${isActive ? ' bottom-tab--active' : ''}`}
            data-tab={tab.id}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="bottom-tab-inner">
              {tab.icon ? (
                <span className="bottom-tab-icon" aria-hidden="true">
                  {tab.icon}
                </span>
              ) : TabIcon ? (
                <TabIcon className="bottom-tab-icon bottom-tab-icon--svg" />
              ) : null}
              <span className="bottom-tab-label">{tab.label}</span>
            </span>
          </button>
        )
      })}
    </nav>
  )
}
