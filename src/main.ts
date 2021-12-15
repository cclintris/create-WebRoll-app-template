import './index.less'

const tick = (): void => {
  let $time: HTMLElement = document.getElementById('js-time')
  $time.textContent = new Date().toLocaleString()
  setTimeout(tick, 1000)
}

tick()
