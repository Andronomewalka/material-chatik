import React, { MouseEvent } from "react";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import { SplitterProp } from "./types";

const getPxValue = (value: string) => {
  return parseInt(value, 10);
};

const Splitter: React.FC<SplitterProp> = ({
  containerRef,
  channelWidthRef,
  minChannelsWidth,
}) => {
  const onDividerMouseDown = (e: MouseEvent) => {
    if (!containerRef.current) return;

    // without it mouseUp not firing in 5% cases if you drag hard;
    e.preventDefault();

    const container = containerRef.current;
    const prevTransitionStyle = container.style.transition;
    container.style.transition = "unset";
    const initX = e.clientX;
    let lastX = initX;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    function mouseMove(e: any) {
      if (container) {
        const newChannelsWidth =
          getPxValue(container.style.width) + e.clientX - lastX;

        if (newChannelsWidth > minChannelsWidth) {
          container.style.width = `${newChannelsWidth}px`;
          channelWidthRef.current = container.style.width;
          lastX = e.clientX;
        }
      } else {
        mouseUp();
      }
    }

    function mouseUp() {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
      container.style.transition = prevTransitionStyle;
    }
  };

  return (
    <Box
      onMouseDown={onDividerMouseDown}
      sx={{
        position: "relative",
        paddingX: "8px",
        "&::after": {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "scaleX(0) translate(-50%, -50%)",
          transformOrigin: "Left",
          content: '"||"',
          fontWeight: "bold",
          transition: ".2s all ease",
        },
        "&:hover": {
          cursor: "col-resize",
          "&::after": {
            transform: "scaleX(1) translate(-50%, -50%)",
          },
          "& > hr": {
            transform: "scaleX(3)",
          },
        },
      }}
    >
      <Divider
        orientation="vertical"
        sx={{
          background: "#e0e0e0",
          borderRightWidth: "2px",
          borderLeftWidth: "2px",
          borderColor: "#e0e0e0",
          transition: ".2s all ease",
        }}
      />
    </Box>
  );
};

export default Splitter;
