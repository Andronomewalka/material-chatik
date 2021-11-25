import React, { useEffect, useRef } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
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
import { useAppSelector } from "hooks/useAppSelector";
import { selectUser } from "state/user";
import { selectFetchStatus } from "state/messages";
import { RequestStatus } from "state/shared/requestStatus";

const ChatHistory: React.FC<ChatHistoryProp> = ({ messages }) => {
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectFetchStatus);
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
    <Box display="flex" flexGrow={1}>
      {status === RequestStatus.Requesting || status === RequestStatus.Idle ? (
        <CircularProgress
          sx={{
            margin: "auto",
          }}
        />
      ) : messages && messages.length > 0 ? (
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
      ) : (
        <Typography
          component="h5"
          variant="h5"
          margin="auto"
          color="text.secondary"
        >
          No messages
        </Typography>
      )}
    </Box>
  );
};

export default ChatHistory;
