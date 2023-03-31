import { isTabletRes } from '../helpers/helpers'

export const programIdScroll = (): void => {
  const imageGrid = document.querySelector('.c-imageGrid')

  let lastScroll = 0

  window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset || document.documentElement.scrollTop
    const imageGridPositionY = imageGrid?.getBoundingClientRect().y

    if (imageGridPositionY && !isTabletRes()) {
      if (scroll > 150) {
        imageGrid.classList.add('-sticky')

        if (scroll > lastScroll && scroll > 0) {
          imageGrid?.classList.remove('-transition')
        } else if (scroll > 1468 && scroll > 1080) {
          imageGrid?.classList.remove('-transition')
        } else {
          imageGrid?.classList.add('-transition')
        }
      } else {
        imageGrid.classList.remove('-sticky')
        imageGrid?.classList.remove('-transition')
      }
    }

    lastScroll = scroll <= 0 ? 0 : scroll
    return
  })

  return
}

window.addEventListener('load', () => programIdScroll())
