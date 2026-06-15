import { categories, type CategoryId } from '../data/categories'

interface CategorySelectorProps {
  selected: CategoryId
  onSelect: (categoryId: CategoryId) => void
}

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <div className="category-selector" role="tablist" aria-label="場景選擇">
      <div className="category-scroll">
        {categories.map((category) => (
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
