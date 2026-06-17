export function SplashScreen() {
  return (
    <div className="splash-screen" role="status" aria-label="旅行口說教練載入中">
      <div className="splash-screen__content">
        <div className="splash-screen__logo-wrap" aria-hidden="true">
          <img className="splash-screen__logo" src="/icon-192.png" alt="" width={88} height={88} />
        </div>
        <h1 className="splash-screen__title">旅行口說教練</h1>
        <p className="splash-screen__subtitle">英文・日文・韓文旅行口說都能練</p>
        <div className="splash-screen__dots" aria-hidden="true">
          <span className="splash-screen__dot splash-screen__dot--primary" />
          <span className="splash-screen__dot splash-screen__dot--accent" />
        </div>
      </div>
    </div>
  )
}
