import React, { useEffect, useRef } from "react";
import {
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { RequestStatus } from "state/shared/requestStatus";
import {
  changeSelectedChannel,
  connectChannel,
  getChannels,
  selectChannelId,
  selectChannels,
  selectError,
  selectFetchStatus,
  selectIsChannelsOpen,
} from "state/channels";
import Splitter from "./Splitter";
import AddChannel from "./AddChannel";
import CreateRoom from "./CreateRoom";

const initChannelsWidth = "250px";
const minChannelsWidth = 200;

const Channels: React.FC = () => {
  const dispatch = useAppDispatch();
  const channels = useAppSelector(selectChannels);
  const status = useAppSelector(selectFetchStatus);
  const error = useAppSelector(selectError);
  const isBarOpen = useAppSelector(selectIsChannelsOpen);
  const selectedChannelId = useAppSelector(selectChannelId);
  const containerRef = useRef<HTMLElement | null>(null);
  const channelWidthRef = useRef(initChannelsWidth);

  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);

  useEffect(() => {
    if (selectedChannelId === 0) {
      if (channels && channels.length > 0) {
        dispatch(changeSelectedChannel(channels[0].id));
      }
    }
  }, [dispatch, channels, selectedChannelId]);

  const onChannelsClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const liChannel = (e.target as any).closest("li");
    if (liChannel) {
      const newChannelId = +liChannel.getAttribute("data-id");
      if (newChannelId !== selectedChannelId) {
        dispatch(changeSelectedChannel(newChannelId));
      }
    }
  };

  return (
    <Box
      ref={containerRef}
      style={{
        width: `${isBarOpen ? channelWidthRef.current : "0"}`,
        transition: ".3s all ease",
      }}
      sx={{
        display: "flex",
        transform: `translateX(${isBarOpen ? "0" : "-100%"})`,
        overflow: "hidden",
        opacity: `${isBarOpen ? "1" : "0"}`,
      }}
    >
      {status === RequestStatus.Requesting || status === RequestStatus.Idle ? (
        <CircularProgress
          sx={{
            margin: "auto",
          }}
        />
      ) : (
        <Box
          sx={{
            flex: "1 0",
            display: "flex",
            flexDirection: "column",
            marginRight: "-8px",
          }}
        >
          <List
            component="ul"
            onClick={onChannelsClick}
            sx={{
              flex: "1 0",
            }}
          >
            {channels.map((channel) => (
              <ListItem
                key={channel.id}
                data-id={channel.id}
                selected={channel.id === selectedChannelId}
                disablePadding
                component="li"
              >
                <ListItemButton component="div">
                  <ListItemText primary={channel.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider
            sx={{
              marginTop: "auto",
            }}
          />
          <AddChannel />
          <CreateRoom />
        </Box>
      )}
      <Splitter
        containerRef={containerRef}
        channelWidthRef={channelWidthRef}
        minChannelsWidth={minChannelsWidth}
      />
    </Box>
  );
};

export default Channels;
