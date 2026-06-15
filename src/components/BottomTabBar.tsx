export type AppTab = 'today' | 'library' | 'dialogue'

interface BottomTabBarProps {
  activeTab: AppTab
  onTabChange: (tab: AppTab) => void
}

const TABS: { id: AppTab; label: string }[] = [
  { id: 'today', label: '今日' },
  { id: 'library', label: '句庫' },
  { id: 'dialogue', label: '情境' },
]

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  return (
    <nav className="bottom-tab-bar" aria-label="主要導覽">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`bottom-tab${activeTab === tab.id ? ' bottom-tab--active' : ''}`}
          aria-current={activeTab === tab.id ? 'page' : undefined}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
