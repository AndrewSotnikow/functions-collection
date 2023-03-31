import Slider from '../slider'

const whyUsSlider = (): void => {
    const section = document.querySelector<HTMLElement>(
        '.c-whyUsSliderSec_swiper'
    )

    if (!section) return

    Slider({
        container: section,
        options: {
            loop: true,
            slidesOffsetBefore: 0,
            spaceBetween: 16,
            pagination: {
                type: 'bullets',
            },
            breakpoints: {
                992: {
                    spaceBetween: 130,
                },
            },
        },
    })
}

export default whyUsSlider
