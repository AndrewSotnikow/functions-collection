export const scrollToSection = (section: string, index?: string): void => {
    const sectionIndex = document.getElementById(`${section}_${index}`)
    const sectionElement = document.getElementById(`${section}`)
    if (sectionIndex || sectionElement) {
        setTimeout(() => {
            if (typeof index !== 'undefined') {
                sectionIndex?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            } else {
                sectionElement?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
        }, 10)
    }
}