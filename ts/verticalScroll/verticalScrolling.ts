const verticalScroll = (container: HTMLElement | null | undefined): void => {
    if (container) {
        let pos: { top: number; left: number; x: number; y: number } = {
            top: 0,
            left: 0,
            x: 0,
            y: 0,
        }
        const mouseDownHandler = (event: MouseEvent): void => {
            pos = {
                // current scroll position
                left: container.scrollLeft,
                top: container.scrollTop,
                // current mouse position
                x: event.clientX,
                y: event.clientY,
            }

            document.addEventListener('mousemove', mouseMoveHandler)
            document.addEventListener('mouseup', mouseUpHandler)
        }

        const mouseMoveHandler = (event: MouseEvent): void => {
            // to unable selecting content while scrolling
            container.style.cursor = 'grabbing'
            container.style.userSelect = 'none'
            // How far the mouse has been moved
            const dx = event.clientX - pos.x
            const dy = event.clientY - pos.y
            // Scroll the element
            container.scrollTop = pos.top - dy
            container.scrollLeft = pos.left - dx
        }

        const mouseUpHandler = (): void => {
            document.removeEventListener('mousemove', mouseMoveHandler)
            document.removeEventListener('mouseup', mouseUpHandler)
        }

        container.addEventListener('mousedown', mouseDownHandler)
    }
}

export default verticalScroll
