const collapse = () => {
    const collapseElems = document.querySelectorAll<HTMLElement>('.js-collapse')

    const scrollToTarget = (target: HTMLElement) => {
        const bodyRect = document.body.getBoundingClientRect()
        const elemRect = target.getBoundingClientRect()
        const offset = elemRect.top - bodyRect.top

        const scroll = window.pageYOffset || document.documentElement.scrollTop

        if (scroll > offset - 104) {
            const additionalSpace = 24 + 104 //add margin + sticky header height
            setTimeout(() => {
                window.scrollTo({
                    top: offset - additionalSpace,
                    behavior: 'smooth',
                })
            }, 200)
        }
    }

    const hide = (el: HTMLElement) => {
        const targetEl = document.querySelector<HTMLElement>(
            '#' + el.dataset.target
        )

        el.classList.remove('-active')
        if (targetEl) {
            targetEl.style.height = 0 + 'px'
            targetEl.classList.remove('-active')
        }
    }
    const show = (el: HTMLElement) => {
        const targetEl = document.querySelector<HTMLElement>(
            '#' + el.dataset.target
        )

        el.classList.add('-active')
        if (targetEl) {
            targetEl.style.height = targetEl.scrollHeight + 'px'
            targetEl.classList.add('-active')
        }
    }

    collapseElems.forEach((el) => {
        const innerLink = el.querySelector('a')

        innerLink?.addEventListener('click', (e) => {
            e.stopPropagation()
        })

        if (el.classList.contains('-active')) {
            const targetEl = document.querySelector<HTMLElement>(
                '#' + el.dataset.target
            )
            targetEl
                ? (targetEl.style.height = targetEl.scrollHeight + 'px')
                : null
        }
        el.addEventListener('click', () => {
            const groupName = el.dataset.group

            if (el.classList.contains('-active')) {
                hide(el)
            } else {
                if (groupName) {
                    // hiding siblings elements
                    const sameGroupElems =
                        document.querySelectorAll<HTMLElement>(
                            '[data-group=' + groupName + ']'
                        )

                    sameGroupElems.forEach((el) => {
                        hide(el)
                    })
                }
                show(el)
                scrollToTarget(el)
            }
        })
    })
}

const countryDropdown = () => {
    const collapseElems = document.querySelectorAll<HTMLElement>(
        '.js-countryDropdown'
    )

    collapseElems.forEach((el) => {
        el.addEventListener('click', () => {
            const groupName = el.dataset.group

            if (el.classList.contains('-active')) {
                el.classList.remove('-active')
            } else {
                if (groupName) {
                    // hiding siblings elements
                    const sameGroupElems =
                        document.querySelectorAll<HTMLElement>(
                            '[data-group=' + groupName + ']'
                        )
                    sameGroupElems.forEach((el) => {
                        el.classList.remove('-active')
                    })
                }
                el.classList.add('-active')
            }
        })
    })
}

window.addEventListener('load', () => {
    collapse()
    countryDropdown()
})
