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
import { Add, Close } from "@mui/icons-material";
import { Formik, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { RequestStatus } from "state/shared/requestStatus";
import {
  changeDialogChannelStatus,
  changeDialogChannelError,
  connectChannel,
  selectDialogChannelStatus,
  selectDialogChannelError,
} from "state/channels";

const AddChannel: React.FC = () => {
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
    { channel }: { channel: string },
    { setSubmitting }: FormikHelpers<{ channel: string }>
  ) => {
    setSubmitting(true);
    dispatch(connectChannel(channel)).then(() => {
      setSubmitting(false);
    });
  };

  const validationSchema = Yup.object({
    channel: Yup.string().trim().required("Required"),
  });

  return (
    <>
      <Button
        variant="text"
        startIcon={<Add />}
        sx={{
          justifyContent: "start",
          paddingLeft: "20px",
          marginTop: "5px",
        }}
        onClick={onOpen}
      >
        Add channel
      </Button>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <Formik
          initialValues={{ channel: "" }}
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
                Add channel
              </Typography>
              <Field
                name="channel"
                type="input"
                disabled={isSubmitting}
                error={errors.channel && touched.channel}
                helperText={
                  errors.channel && touched.channel ? errors.channel : ""
                }
                as={TextField}
                label="Channel"
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
                Add
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

export default AddChannel;
