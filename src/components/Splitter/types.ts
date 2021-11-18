import { MutableRefObject, RefObject } from "react";

export interface SplitterProp {
    containerRef: RefObject<HTMLElement | null>,
    channelWidthRef: MutableRefObject<string>
}