import Slider from '../slider'

const mealSlider = (): void => {
    const section = document.querySelector<HTMLElement>(
        '.c-mealSliderSec_swiper'
    )

    if (!section) return

    Slider({
        container: section,
        options: {
            loop: true,
            slidesOffsetBefore: 16,
            spaceBetween: 16,
            pagination: {
                type: 'bullets',
            },
            breakpoints: {
                992: {
                    slidesOffsetBefore: 100,
                    spaceBetween: 60,
                },
            },
        },
    })
}

export default mealSlider
