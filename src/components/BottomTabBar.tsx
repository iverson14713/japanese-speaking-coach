import type { ComponentType } from 'react'
import { CoachTabIcon } from './icons/CoachTabIcon'
import { DialogueTabIcon } from './icons/DialogueTabIcon'
import { LibraryTabIcon } from './icons/LibraryTabIcon'
import { TodayTabIcon } from './icons/TodayTabIcon'

export type AppTab = 'today' | 'library' | 'dialogue' | 'coach'

interface BottomTabBarProps {
  activeTab: AppTab
  onTabChange: (tab: AppTab) => void
}

type TabIconComponent = ComponentType<{ className?: string }>

interface TabConfig {
  id: AppTab
  label: string
  Icon: TabIconComponent
}

const TABS: TabConfig[] = [
  { id: 'today', label: '今日', Icon: TodayTabIcon },
  { id: 'library', label: '句庫', Icon: LibraryTabIcon },
  { id: 'dialogue', label: '情境', Icon: DialogueTabIcon },
  { id: 'coach', label: '教練', Icon: CoachTabIcon },
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
              <TabIcon className="bottom-tab-icon bottom-tab-icon--svg" />
              <span className="bottom-tab-label">{tab.label}</span>
            </span>
          </button>
        )
      })}
    </nav>
  )
}
