const mouseGrabScroll = (
    container: HTMLElement,
    updateDeltaY: (decision: boolean) => void
) => {
    let pos = { top: 0, left: 0, x: 0, y: 0 }

    const mouseDownHandler = function (event: MouseEvent) {
        pos = {
            left: container.scrollLeft,
            top: container.scrollTop,

            x: event.clientX,
            y: event.clientY,
        }

        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)
    }

    const mouseMoveHandler = function (event: MouseEvent) {
        container.style.cursor = 'grabbing'
        container.style.userSelect = 'none'

        const deltaX = event.clientX - pos.x
        const deltaY = event.clientY - pos.y

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            container.scrollLeft = pos.left - deltaX
        } else {
            container.scrollTop = pos.top - deltaY
        }
        setTimeout(() => {
            updateDeltaY(true)
        }, 200)
    }

    const mouseUpHandler = function () {
        container.style.cursor = ''
        container.style.userSelect = ''

        document.removeEventListener('mousemove', mouseMoveHandler)
        document.removeEventListener('mouseup', mouseUpHandler)
        setTimeout(() => {
            updateDeltaY(false)
        }, 200)
    }

    container.addEventListener('mousedown', mouseDownHandler)
}

export { mouseGrabScroll }
