import { Box } from "@mui/material"
import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { ReactComponent as ArrowLeft } from "./paginationArrowLeft.svg"
import { ReactComponent as ArrowRight } from "./paginationArrowRight.svg"
import verticalScroll from "./verticalScrolling"

interface VerticalScrollProps {
  children: React.ReactNode
  setStartIndex: React.Dispatch<React.SetStateAction<number>>
  setEndIndex: React.Dispatch<React.SetStateAction<number>>
  startIndex: number
}

const VerticalScroll: React.FC<VerticalScrollProps> = ({
  children,
  setStartIndex,
  setEndIndex,
  startIndex,
}) => {
  const [scrollValue, setScrollValue] = useState(0)
  const [channelWidth, setChannelWidth] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const epgContainerRef = useRef<HTMLDivElement>(null)
  const epgElement = epgContainerRef.current

  const onClickHandlerLeft = () => {
    if (epgElement) {
      const scrollLeft = epgElement.scrollLeft - channelWidth
      setScrollValue(scrollLeft)
      epgElement.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      })
    }
  }

  const onClickHandlerRight = () => {
    if (epgElement) {
      const scrollLeft = epgElement.scrollLeft + channelWidth
      setScrollValue(scrollLeft)
      epgElement.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    if (epgElement) {
      epgElement.scrollLeft = scrollValue
    }
  }, [scrollValue, epgElement])

  useEffect(() => {
    if (epgElement) {
      setChannelWidth(epgElement?.offsetWidth / 3)
    }
  }, [windowWidth, epgElement])

  const addElementsAmount = 2
  const [epgContainer, setEpgContainer] = useState<
    HTMLElement | null | undefined
  >()

  let previousScrollLeft = 0

  const updateViewIfNeed = (): void => {
    if (epgElement) {
      const width = epgElement.clientWidth
      const { scrollWidth } = epgElement
      const offset = 50
      const currentScrollLeft = epgElement.scrollLeft
      const userHistsRight = scrollWidth - currentScrollLeft - width <= offset

      if (currentScrollLeft > previousScrollLeft) {
        // user hit right
        if (userHistsRight) {
          setEndIndex((prev) => prev + addElementsAmount)
          setStartIndex((prev) => prev + addElementsAmount)
        }
      }

      if (currentScrollLeft < previousScrollLeft) {
        // user hit left
        if (currentScrollLeft === 0 && startIndex != 0) {
          setEndIndex((prev) => prev - addElementsAmount)
          setStartIndex((prev) => prev - addElementsAmount)
        }
      }

      previousScrollLeft = currentScrollLeft
    }
  }

  useEffect(() => {
    const epgElement = epgContainerRef.current

    setEpgContainer(epgElement)
    verticalScroll(epgContainer)

    if (epgElement) {
      const handleResize = () => {
        setWindowWidth(window.innerWidth)
      }

      window.addEventListener("resize", handleResize)

      epgElement.addEventListener("scroll", updateViewIfNeed)

      return () => {
        epgElement.removeEventListener("scroll", updateViewIfNeed)
        window.removeEventListener("resize", handleResize)
      }
    }
  })

  const containerStyle = {
    position: "relative",
    display: "flex",
    overflow: "hidden",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    flex: "none",
    scrollSnapType: "x mandatory",
    scrollBehavior: "smooth",
    flexFlow: "row nowrap",
    cursor: "grab",
    justifyContent: "left",
    marginTop: "20px",
    userSelect: "none",
    height: "100%",
  }

  const arrowButton = {
    position: "absolute",
    top: "56px",
    backgroundColor: "secondary.main",
    borderRadius: "50%",
    zIndex: 99999,
  }

  const leftArrow = {
    left: "32px",
  }
  const rightArrow = {
    right: "32px",
  }

  return (
    <>
      <Box
        sx={{ ...arrowButton, ...leftArrow }}
        onClick={() => onClickHandlerLeft()}
      >
        <ArrowLeft />
      </Box>
      <Box ref={epgContainerRef} sx={containerStyle} dir="ltr">
        {children}
      </Box>
      <Box
        sx={{ ...arrowButton, ...rightArrow }}
        onClick={() => onClickHandlerRight()}
      >
        <ArrowRight />
      </Box>
    </>
  )
}

export default VerticalScroll
