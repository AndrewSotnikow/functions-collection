const accordion = () => {
    const section = document.querySelector('.c-accordion')
    if (!section) return

    const mobileMore = section.querySelector('.js-accordionMore')
    const hiddenItems = section.querySelectorAll(
        '.c-accordion_item.-hiddenMobile'
    )

    mobileMore?.addEventListener('click', (e) => {
        e.preventDefault()
        mobileMore.classList.add('d-none')
        hiddenItems.forEach((item) => {
            item.classList.remove('-hiddenMobile')
        })
    })
}
window.addEventListener('load', accordion)
