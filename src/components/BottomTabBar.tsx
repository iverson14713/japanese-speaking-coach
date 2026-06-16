export type AppTab = 'today' | 'library' | 'dialogue' | 'coach'

interface BottomTabBarProps {
  activeTab: AppTab
  onTabChange: (tab: AppTab) => void
}

const TABS: { id: AppTab; label: string; icon: string }[] = [
  { id: 'today', label: '今日', icon: '🔥' },
  { id: 'library', label: '句庫', icon: '📖' },
  { id: 'dialogue', label: '情境', icon: '🎭' },
  { id: 'coach', label: '教練', icon: '💬' },
]

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  return (
    <nav className="bottom-tab-bar" aria-label="主要導覽">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            className={`bottom-tab${isActive ? ' bottom-tab--active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="bottom-tab-inner">
              <span className="bottom-tab-icon" aria-hidden="true">
                {tab.icon}
              </span>
              <span className="bottom-tab-label">{tab.label}</span>
            </span>
          </button>
        )
      })}
    </nav>
  )
}
