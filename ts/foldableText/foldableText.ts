const foldableText = (): void => {
  const foldableText = document.querySelectorAll('.c-foldableText')

  foldableText.forEach((paragraph) => {
    const dots = paragraph.querySelector<HTMLElement>('.foldableTextDots')
    const readMoreText = paragraph.querySelector<HTMLElement>(
      '.foldableTextReadMore'
    )
    const readMoreButton = paragraph.querySelector<HTMLElement>(
      '.foldableTextButton'
    )

    if (!dots || !readMoreText || !readMoreButton) return

    readMoreButton.addEventListener('click', () => {
      dots.classList.toggle('d-none')
      readMoreButton.innerHTML =
        readMoreButton.innerHTML === 'czytaj więcej'
          ? (readMoreButton.innerHTML = 'zwiń')
          : (readMoreButton.innerHTML = 'czytaj więcej')
      readMoreText.classList.toggle('d-none')
    })
  })

  return
}

window.addEventListener('load', foldableText)

export default foldableText
