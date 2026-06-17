import type { CategoryId } from '../data/categories'
import { categories, getCategoryLabel, getCategoryTag } from '../data/categories'

interface CategorySelectorProps {
  selected: CategoryId
  availableCategories: CategoryId[]
  onSelect: (categoryId: CategoryId) => void
}

export function CategorySelector({
  selected,
  availableCategories,
  onSelect,
}: CategorySelectorProps) {
  const visibleCategories = categories.filter((c) => availableCategories.includes(c.id))

  return (
    <div className="category-selector" role="tablist" aria-label="場景選擇">
      <p className="category-section-label">目前場景：{getCategoryLabel(selected)}</p>
      <div className="category-scroll">
        {visibleCategories.map((category) => {
          const isActive = selected === category.id
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              className={`category-button${isActive ? ' active' : ''}`}
              aria-selected={isActive}
              onClick={() => onSelect(category.id)}
            >
              <span className="category-button-label">{category.label}</span>
              <span className="category-button-count">{getCategoryTag(category.id)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
