import mealSlider from '../sliders/mealSlider'
import opinionSlider from '../sliders/opinionSlider'
import mealSliderSmall from '../sliders/mealSliderSmall'
import whyUsSlider from '../sliders/whyUsSlider'

const Sliders = (): void => {
    let sections = [
        { target: 'c-mealSliderSec_swiper', isReady: false },
        { target: 'c-mealSliderSmallSec_swiper', isReady: false },
        { target: 'c-whyUsSliderSec_swiper', isReady: false },
        { target: 'c-opinionSliderSec', isReady: false },
    ]
    const options = {
        rootMargin: '0px',
        threshold: 0,
    }

    const isSectionReady = (section: string) => {
        return sections.some(
            (_section) => _section.target === section && _section.isReady
        )
    }

    const setSectionReady = (section: string) => {
        sections = sections.map((_section) => {
            if (_section.target === section) {
                return { ..._section, isReady: true }
            }

            return _section
        })
    }

    sections.forEach((section) => {
        const target = document.querySelector(`.${section.target}`)
        if (!target) return
        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (
                    !entry.target.classList.contains(section.target) ||
                    !entry.isIntersecting
                )
                    return

                if (section.target === 'c-mealSliderSec_swiper') {
                    if (isSectionReady('c-mealSliderSec_swiper')) return

                    mealSlider()
                    setSectionReady('c-mealSliderSec_swiper')
                } else if (section.target === 'c-mealSliderSmallSec_swiper') {
                    if (isSectionReady('c-mealSliderSmallSec_swiper')) return

                    mealSliderSmall()
                    setSectionReady('c-mealSliderSmallSec_swiper')
                } else if (section.target === 'c-whyUsSliderSec_swiper') {
                    if (isSectionReady('c-whyUsSliderSec_swiper')) return

                    whyUsSlider()
                    setSectionReady('c-whyUsSliderSec_swiper')
                } else if (section.target === 'c-opinionSliderSec') {
                    if (isSectionReady('c-opinionSliderSec')) return

                    opinionSlider()
                    setSectionReady('c-opinionSliderSec')
                }
            })
        }
        // eslint-disable-next-line compat/compat
        const observer = new IntersectionObserver(callback, options)
        observer.observe(target)
    })
}

Sliders()

export default Sliders
