import React, { SyntheticEvent, useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Close, MeetingRoom } from "@mui/icons-material";
import { Formik, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { RequestStatus } from "state/shared/requestStatus";
import {
  changeDialogChannelStatus,
  changeDialogChannelError,
  selectDialogChannelStatus,
  selectDialogChannelError,
} from "state/channels";
import { createRoom } from "state/room";

const CreateRoom: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectDialogChannelStatus);
  const error = useAppSelector(selectDialogChannelError);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (e: any) => {
    dispatch(changeDialogChannelStatus(RequestStatus.Idle));
    dispatch(changeDialogChannelError(""));
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (status === RequestStatus.Succeeded) {
      setIsOpen(false);
    }
  }, [status]);

  const onSubmit = (
    { name, description }: { name: string; description: string },
    { setSubmitting }: FormikHelpers<{ name: string; description: string }>
  ) => {
    setSubmitting(true);
    dispatch(
      createRoom({
        name,
        description,
      })
    ).then(() => {
      setSubmitting(false);
    });
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Required"),
    description: Yup.string(),
  });

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
        onClick={onOpen}
      >
        Create Room
      </Button>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <Formik
          initialValues={{ name: "", description: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, submitForm, isSubmitting }) => (
            <Box
              component="form"
              onSubmit={(e: SyntheticEvent) => {
                e.preventDefault();
                submitForm();
              }}
              sx={{
                width: "400px",
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
              <Typography
                component="h4"
                variant="h4"
                sx={{
                  marginBottom: "10px",
                }}
              >
                Create room
              </Typography>
              <Field
                name="name"
                type="input"
                disabled={isSubmitting}
                error={errors.name && touched.name}
                helperText={errors.name && touched.name ? errors.name : ""}
                as={TextField}
                label="Room name"
                variant="outlined"
              />
              <Field
                name="description"
                type="input"
                disabled={isSubmitting}
                error={errors.description && touched.description}
                helperText={
                  errors.description && touched.description
                    ? errors.description
                    : ""
                }
                as={TextField}
                label="Room description"
                variant="outlined"
              />
              <Box height="24px">
                {status !== RequestStatus.Requesting && error && (
                  <Typography
                    variant="body1"
                    component="p"
                    color="error"
                    textAlign="center"
                  >
                    {error}
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Create
              </Button>
              {isSubmitting && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
            </Box>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default CreateRoom;
