let hideTimeout: ReturnType<typeof setTimeout> | null = null

function getToastElement(): HTMLDivElement {
  let element = document.getElementById('app-toast') as HTMLDivElement | null
  if (!element) {
    element = document.createElement('div')
    element.id = 'app-toast'
    element.className = 'app-toast'
    element.setAttribute('role', 'status')
    element.setAttribute('aria-live', 'polite')
    document.body.appendChild(element)
  }
  return element
}

export function showToast(message: string, durationMs = 2800): void {
  const element = getToastElement()
  element.textContent = message
  element.classList.add('app-toast--visible')

  if (hideTimeout) {
    clearTimeout(hideTimeout)
  }

  hideTimeout = setTimeout(() => {
    element.classList.remove('app-toast--visible')
  }, durationMs)
}
