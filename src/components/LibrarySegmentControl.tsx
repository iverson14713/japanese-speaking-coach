export type LibrarySegment = 'all' | 'favorites' | 'recent'

interface LibrarySegmentControlProps {
  selected: LibrarySegment
  onSelect: (segment: LibrarySegment) => void
}

const SEGMENTS: { id: LibrarySegment; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'favorites', label: '收藏' },
  { id: 'recent', label: '最近練習' },
]

export function LibrarySegmentControl({ selected, onSelect }: LibrarySegmentControlProps) {
  return (
    <div className="library-segment" role="tablist" aria-label="句庫篩選">
      {SEGMENTS.map((segment) => {
        const isActive = selected === segment.id
        return (
          <button
            key={segment.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`library-segment__item${isActive ? ' library-segment__item--active' : ''}`}
            onClick={() => onSelect(segment.id)}
          >
            {segment.label}
          </button>
        )
      })}
    </div>
  )
}
