import React, { SyntheticEvent, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { useAppDispatch } from "hooks/useAppDispatch";
import { connectChannel } from "state/channels";

const AddChannel: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const onOpen = (e: any) => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsOpen(false);
    dispatch(connectChannel(input));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <Button
        variant="text"
        startIcon={<Add />}
        sx={{
          justifyContent: "start",
          paddingLeft: "20px",
        }}
        onClick={onOpen}
      >
        Add user
      </Button>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "15px",
            padding: "30px 40px",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
            }}
            onClick={onClose}
          >
            <Close />
          </IconButton>
          <Typography component="h4" variant="h4">
            Add User
          </Typography>
          <TextField
            label="User"
            variant="standard"
            sx={{
              width: "300px",
            }}
            autoFocus
            onChange={onInputChange}
            value={input}
          />
          <Button type="submit" variant="contained" onClick={onSubmit}>
            Add
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default AddChannel;
