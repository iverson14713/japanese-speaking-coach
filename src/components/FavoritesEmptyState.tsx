export function FavoritesEmptyState() {
  return (
    <div className="favorites-empty" role="status">
      <span className="favorites-empty__icon" aria-hidden="true">
        ♡
      </span>
      <p className="favorites-empty__title">還沒有收藏句子</p>
      <p className="favorites-empty__text">
        看到實用句子時，點愛心加入收藏，之後可以快速複習。
      </p>
    </div>
  )
}
