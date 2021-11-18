import React, { useEffect, useRef } from "react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import {
  getChannels,
  selectChannels,
  selectError,
  selectFetchStatus,
  selectIsChannelsOpen,
} from "state/channels";
import { Box } from "@mui/system";
import Splitter from "components/Splitter";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { RequestStatus } from "state/shared/requestStatus";

let initChannelsWidth = "200px";

const Channels: React.FC = () => {
  const dispatch = useAppDispatch();
  const channels = useAppSelector(selectChannels);
  const status = useAppSelector(selectFetchStatus);
  const error = useAppSelector(selectError);
  const isBarOpern = useAppSelector(selectIsChannelsOpen);
  const containerRef = useRef<HTMLElement | null>(null);
  const channelWidthRef = useRef(initChannelsWidth);

  useEffect(() => {
    dispatch(getChannels());
  }, []);

  return (
    <Box
      ref={containerRef}
      style={{
        width: `${isBarOpern ? channelWidthRef.current : "0"}`,
        transition: ".3s all ease",
      }}
      sx={{
        display: "flex",
        transform: `translateX(${isBarOpern ? "0" : "-100%"})`,
        opacity: `${isBarOpern ? "1" : "0"}`,
        "& > ul:first-of-type": {
          flex: "1 1",
        },
      }}
    >
      {status === RequestStatus.Requesting || status === RequestStatus.Idle ? (
        <CircularProgress
          sx={{
            margin: "auto",
          }}
        />
      ) : (
        <List component="ul">
          {channels.map((channel) => (
            <ListItem key={channel.id} disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary={channel.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      <Splitter containerRef={containerRef} channelWidthRef={channelWidthRef} />
    </Box>
  );
};

export default Channels;
