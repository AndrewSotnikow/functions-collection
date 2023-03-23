import { isMobileRes } from '../../ts/helpers/helpers'

const hideMenu = () => {
  const mainHeader = document.querySelector('.l-header')
  const hamburgerButton = document.querySelector('.c-hamburger')
  const mainNavigation = document.getElementById('mainNavigation')

  if (!mainHeader || !hamburgerButton || !mainNavigation) return

  mainHeader.classList.toggle('-active')
  hamburgerButton.classList.toggle('-active')
  mainNavigation.classList.toggle('-active')

  if (mainHeader.classList.contains('-active')) {
    document.documentElement.classList.add('-menuActive')
  } else {
    document.documentElement.classList.remove('-menuActive')
  }
}

const mainMenu = async () => {
  const hamburgerButton = document.querySelector('.c-hamburger')

  if (!hamburgerButton) return

  hamburgerButton.addEventListener('click', hideMenu)
}

const mainHeader = () => {
  let lastScroll = 0
  const stickyHeader = document.querySelector('.l-header')

  if (!stickyHeader) return

  window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset || document.documentElement.scrollTop

    if (scroll > lastScroll && scroll > 0) {
      stickyHeader.classList.add('-isSticky')
    } else {
      stickyHeader.classList.remove('-isSticky')
    }

    lastScroll = scroll <= 0 ? 0 : scroll
  })
}

const submenuDiet = () => {
  const header = document.querySelector<HTMLElement>('.l-header')
  const mainNavigation = document.getElementById('mainNavigation')
  const navigation =
    mainNavigation?.querySelector<HTMLElement>('.c-navHorizontal')

  const menuDietItem = navigation?.querySelector<HTMLElement>(
    '.c-navHorizontal_item.-withSubmenu'
  )

  const menuDietLink = menuDietItem?.querySelector<HTMLElement>(
    '.c-navHorizontal_link'
  )
  const dietSubmenu = menuDietItem?.querySelector('.c-navHorizontal.-submenu')

  if (
    !mainNavigation ||
    !header ||
    !menuDietItem ||
    !menuDietLink ||
    !dietSubmenu
  )
    return

  let closeTimeout: ReturnType<typeof setTimeout>

  if (isMobileRes()) {
    menuDietItem.addEventListener('click', hideMenu)
  }

  menuDietItem.addEventListener('mouseenter', () => {
    clearTimeout(closeTimeout)

    menuDietItem.classList.add('-opened')
  })

  menuDietItem.addEventListener('mouseleave', () => {
    closeTimeout = setTimeout(() => {
      menuDietItem.classList.remove('-opened')
    }, 350)
  })

  navigation?.addEventListener('mouseleave', () => {
    menuDietItem.classList.remove('-opened')
  })
}

window.addEventListener('load', () => {
  mainMenu()
  mainHeader()
  submenuDiet()
})
