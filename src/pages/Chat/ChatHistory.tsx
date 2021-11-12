import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { ChatHistoryProp } from "./types";
import Message from "components/Message";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import { useDebouncedCallback } from "use-debounce";
import { useUpdateState } from "hooks/useUpdateState";

const ChatHistory: React.FC<ChatHistoryProp> = ({ messages }) => {
  const chatListRef = useRef<List>(null);
  const chatListCache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 40,
    })
  );
  const updateState = useUpdateState();

  useEffect(() => {
    //double scroll is needed, only one works not quite accurate(react-virtualized bug)
    chatListRef.current?.scrollToRow(messages.length - 1);
    const timeout = setTimeout(() => {
      chatListRef.current?.scrollToRow(messages.length - 1);
    }, 50);

    return () => clearTimeout(timeout);
  }, [messages]);

  const onReszieDebounced = useDebouncedCallback((e) => {
    chatListCache.current.clearAll();
    updateState();
  }, 50);

  return (
    <Box flexGrow={1}>
      <AutoSizer onResize={onReszieDebounced}>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            rowHeight={chatListCache.current.rowHeight}
            rowCount={messages.length}
            deferredMeasurementCache={chatListCache.current}
            ref={chatListRef}
            rowRenderer={({ key, index, style, parent }) => {
              const message = messages[index];
              return (
                <CellMeasurer
                  key={key}
                  cache={chatListCache.current}
                  parent={parent}
                  columnIndex={0}
                  rowIndex={index}
                >
                  <div style={style}>
                    <Message key={message.id} {...message} />
                  </div>
                </CellMeasurer>
              );
            }}
          />
        )}
      </AutoSizer>
    </Box>
  );
};

export default ChatHistory;
