import Swiper, {
    Navigation,
    Pagination,
    SwiperOptions,
    EffectFade,
    Keyboard,
    Autoplay,
} from 'swiper'
import 'swiper/swiper-bundle.css'

import { NavigationOptions } from 'swiper/types/components/navigation'

Swiper.use([Navigation, Pagination, EffectFade, Keyboard, Autoplay])
interface SliderParameters {
    container: HTMLElement
    options?: SwiperOptions
}

const Slider = (sliderOptions: SliderParameters): Swiper => {
    const defaultParameters: SwiperOptions = {
        speed: 400,
        slidesPerView: 'auto',
        slideActiveClass: '-active',
        effect: 'slide',
        navigation: {
            disabledClass: '-disabled',
        },
        preventClicks: false,
        noSwipingSelector: 'a',
    }

    const { options, container } = sliderOptions

    const paginationEl: Element | null =
        container.querySelector('.swiper-pagination') || null
    const itemBtnPrev: Element | null =
        container.querySelector('.-prev') || null
    const itemBtnNext: Element | null =
        container.querySelector('.-next') || null

    const navigation = Object.assign(
        {},
        { ...(defaultParameters.navigation as NavigationOptions) },
        {
            prevEl: itemBtnPrev || undefined,
            nextEl: itemBtnNext || undefined,
        },
        options?.navigation
    )

    const pagination = Object.assign(
        {},
        {
            el: paginationEl || undefined,
            clickable: true,
            type: 'bullets',
        },
        options?.pagination
    )

    const parameters = Object.assign({ ...defaultParameters }, options, {
        pagination,
        navigation,
    })

    return new Swiper(container, parameters)
}

export default Slider
