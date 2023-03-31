import { isTabletRes } from '../helpers/helpers'

const parallax = () => {
  const decor = document.querySelectorAll<HTMLElement>('.c-parallax')

  document.addEventListener('mousemove', (event) => {
    const lineY = event.pageY * -0.015
    const lineX = event.pageX * -0.05

    if (decor) {
      decor.forEach((item) => {
        item.style.transform = `translate(${lineX}px, ${30 + lineY}px)`
      })
    }
  })
}

window.addEventListener('load', () => {
  if (!isTabletRes()) parallax()
})
