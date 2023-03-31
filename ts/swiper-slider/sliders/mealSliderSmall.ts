import Slider from '../slider'

const mealSliderSmall = (): void => {
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

export default mealSliderSmall
