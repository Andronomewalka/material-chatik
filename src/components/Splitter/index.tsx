import React from "react";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import { SplitterProp } from "./types";

const getPxValue = (value: string) => {
  return parseInt(value, 10);
};

const Splitter: React.FC<SplitterProp> = ({
  containerRef,
  channelWidthRef,
}) => {
  const onDividerMouseDown = (e: any) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const prevTransitionStyle = container.style.transition;
    container.style.transition = "unset";
    const initX = e.clientX;
    let lastX = initX;

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    function mouseMove(e: any) {
      if (container) {
        const newChannelsWidth =
          getPxValue(container.style.width) + e.clientX - lastX;

        container.style.width = `${
          newChannelsWidth < 100 ? 100 : newChannelsWidth
        }px`;

        channelWidthRef.current = container.style.width;
        lastX = e.clientX;
      }
    }

    function mouseUp() {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
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
          borderRightWidth: "2px",
          borderLeftWidth: "2px",
          transition: ".2s all ease",
        }}
      />
    </Box>
  );
};

export default Splitter;
