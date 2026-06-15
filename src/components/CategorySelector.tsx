import type { CategoryId } from '../data/categories'
import { categories } from '../data/categories'

interface CategorySelectorProps {
  selected: CategoryId
  availableCategories: CategoryId[]
  onSelect: (categoryId: CategoryId) => void
}

export function CategorySelector({ selected, availableCategories, onSelect }: CategorySelectorProps) {
  const visibleCategories = categories.filter((c) => availableCategories.includes(c.id))

  return (
    <div className="category-selector" role="tablist" aria-label="場景選擇">
      <p className="category-section-label">選擇旅行情境</p>
      <div className="category-scroll">
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            className={`category-button${selected === category.id ? ' active' : ''}`}
            aria-selected={selected === category.id}
            onClick={() => onSelect(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}
