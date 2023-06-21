import { Box } from "@mui/material"
import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { ReactComponent as ArrowLeft } from "../../../assets/icons/paginationArrowLeft.svg"
import { ReactComponent as ArrowRight } from "../../../assets/icons/paginationArrowRight.svg"
import { ExtendedEpgElement } from "types/epg/Epg"
import ChannelGuideView from "../ChannelGuideView"
import debounce from "../debounce/debounce"
interface VerticalScrollProps {
  data: ExtendedEpgElement[]
}

const VerticalScroll = ({ data }: VerticalScrollProps) => {
  const epgContainerRef = useRef<HTMLDivElement>(null)
  const epgElement = epgContainerRef.current
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(3)
  const [initialX, setInitialX] = useState<number | null>(null)

  const slicedEpgData: ExtendedEpgElement[] = data.slice(startIndex, endIndex)

  const onClickHandlerLeft = () => {
    if (epgElement) {
      if (startIndex !== 0) {
        setEndIndex((prev) => prev - addElementsAmount)
        setStartIndex((prev) => prev - addElementsAmount)
      }
    }
  }
  const onClickHandlerRight = () => {
    if (epgElement) {
      if (endIndex !== data.length) {
        setEndIndex((prev) => prev + addElementsAmount)
        setStartIndex((prev) => prev + addElementsAmount)
      }
    }
  }

  const addElementsAmount = 1

  const detectMouseDirection = (
    initialX: number,
    currentX: number
  ): "left" | "right" | null => {
    const threshold = 50

    if (currentX - initialX > threshold) {
      return "right"
    }

    if (initialX - currentX > threshold) {
      return "left"
    }

    return null
  }

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setInitialX(event.clientX)
    }

    const handleMouseUp = () => {
      setInitialX(null)
    }

    const handleMouseMove = debounce((event: MouseEvent) => {
      if (initialX !== null) {
        const currentX = event.clientX
        const direction = detectMouseDirection(initialX, currentX)

        if (direction === "left") {
          setEndIndex((prev) => prev + addElementsAmount)
          setStartIndex((prev) => prev + addElementsAmount)
        } else if (direction === "right") {
          if (startIndex !== 0) {
            setEndIndex((prev) => prev - addElementsAmount)
            setStartIndex((prev) => prev - addElementsAmount)
          }
        }
      }
    }, 100)

    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [initialX])

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
        {slicedEpgData.map((channel: ExtendedEpgElement, key) => (
          <ChannelGuideView key={key} channel={channel} />
        ))}
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
