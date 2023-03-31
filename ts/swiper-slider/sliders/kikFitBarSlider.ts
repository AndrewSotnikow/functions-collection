import Slider from '../slider'

const mealSlider = () => {
    const section = document.querySelector<HTMLElement>(
        '.c-mealSliderSec_swiper'
    )

    if (!section) return

    Slider({
        container: section,
        options: {
            loop: true,
            slidesOffsetBefore: 0,
            spaceBetween: 0,
            pagination: {
                type: 'bullets',
            },
            breakpoints: {
                992: {
                    spaceBetween: 60,
                    slidesOffsetBefore: 100,
                },
            },
        },
    })
}

const mealSliderSmall = () => {
    const section = document.querySelector<HTMLElement>(
        '.c-mealSliderSmallSec_swiper'
    )

    if (!section) return

    Slider({
        container: section,
        options: {
            loop: true,
            spaceBetween: 16,
            pagination: {
                type: 'bullets',
            },
            breakpoints: {
                992: {
                    spaceBetween: 60,
                },
            },
        },
    })
}

window.addEventListener('load', () => {
    mealSlider()
    mealSliderSmall()
})
