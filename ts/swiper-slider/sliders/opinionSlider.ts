import Slider from '../slider'

const opinionSlider = (): void => {
    const section = document.querySelector<HTMLElement>(
        '.c-opinionSliderSec_swiper'
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
                    slidesOffsetBefore: 0,
                    spaceBetween: 60,
                },
                768: {
                    slidesOffsetBefore: 0,
                },
            },
        },
    })
}

export default opinionSlider
