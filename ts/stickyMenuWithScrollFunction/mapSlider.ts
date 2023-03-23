import { scrollToSection } from '../scrollToSection/scrollToSection'

const mapSlider = () => {
    const slider = document.querySelector<HTMLElement>('.c-cityBar')
    const container = document.querySelector<HTMLElement>(
        '.c-map_cityContainer'
    )
    const buttons = document.querySelectorAll<HTMLElement>('.c-cityButton')
    const warsaw = document.getElementById('warsaw')
    const krakow = document.getElementById('krakow')
    const threeCity = document.getElementById('threeCity')
    const poznan = document.getElementById('poznan')
    const katowice = document.getElementById('katowice')
    const wroclaw = document.getElementById('wroclaw')

    let lastScroll = 0

    let eventType: 'click' | 'scroll' | '' = ''

    if (!slider) return

    const scrollContainer = (index: number) => {
        if (index === 2 || index === 3) {
            container?.scrollTo({
                left: index === 2 ? -300 : 300,
                behavior: 'smooth',
            })
        }

        return
    }

    let scrollTimer: ReturnType<typeof setTimeout>

    buttons.forEach((targetButton) => {
        targetButton.addEventListener('click', () => {
            clearTimeout(scrollTimer)

            scrollTimer = setTimeout(() => {
                eventType = 'scroll'
            }, 1200)

            buttons.forEach((button) => {
                button.classList.remove('-active', '-decor')
            })

            eventType = 'click'

            buttons.forEach((button, index) => {
                if (
                    button.dataset.city?.includes(
                        targetButton.dataset.city || ''
                    )
                ) {
                    button.classList.add('-active', '-decor')

                    setTimeout(() => {
                        scrollToSection(targetButton.dataset.city || '')
                    }, 10)

                    setTimeout(() => {
                        scrollContainer(index)
                    }, 800)
                }

                return
            })

            return
        })

        return
    })

    let activeButton = ''

    window.addEventListener('scroll', () => {
        if (eventType === 'click') return

        const warsawPositionY = warsaw?.getBoundingClientRect().y
        const krakowPositionY = krakow?.getBoundingClientRect().y
        const threeCityPositionY = threeCity?.getBoundingClientRect().y
        const poznanPositionY = poznan?.getBoundingClientRect().y
        const katowicePositionY = katowice?.getBoundingClientRect().y
        const wroclawPositionY = wroclaw?.getBoundingClientRect().y

        if (
            warsawPositionY &&
            krakowPositionY &&
            threeCityPositionY &&
            poznanPositionY &&
            katowicePositionY &&
            wroclawPositionY
        ) {
            if (warsawPositionY < 462 && warsawPositionY > -1170) {
                activeButton = warsaw.id
            } else if (krakowPositionY < 280 && krakowPositionY > -440) {
                activeButton = krakow.id
            } else if (threeCityPositionY < 280 && threeCityPositionY > -220) {
                activeButton = threeCity.id
            } else if (poznanPositionY < 280 && poznanPositionY > -400) {
                activeButton = poznan.id
            } else if (katowicePositionY < 280 && katowicePositionY > -300) {
                activeButton = katowice.id
            } else if (wroclawPositionY < 280 && wroclawPositionY > -300) {
                activeButton = wroclaw.id
            }

            buttons.forEach((button, index) => {
                if (
                    button.dataset.city?.includes(activeButton) &&
                    activeButton
                ) {
                    button.classList.add('-active', '-decor')

                    scrollContainer(index)
                } else {
                    button.classList.remove('-active', '-decor')
                }

                return
            })
        }

        return
    })

    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset || document.documentElement.scrollTop

        if (scroll > lastScroll && scroll > 0) {
            slider.classList.remove('-transition')
        } else {
            slider.classList.add('-transition')
        }

        if (scroll > 577) {
            slider.classList.add('-active')
        } else {
            slider.classList.remove('-active', '-transition')
        }

        lastScroll = scroll <= 0 ? 0 : scroll

        return
    })
}

window.addEventListener('load', () => {
    mapSlider()
    window.scrollTo(0, 0)
})
