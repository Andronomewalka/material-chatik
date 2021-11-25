import React, { useState } from "react";
import { Button } from "@mui/material";
import { MeetingRoom } from "@mui/icons-material";

const CreateRoom: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = (e: any) => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="text"
        startIcon={<MeetingRoom />}
        sx={{
          justifyContent: "start",
          paddingLeft: "20px",
          marginBottom: "5px",
        }}
        onClick={openDialog}
      >
        Create Room
      </Button>
    </>
  );
};

export default CreateRoom;
