import React, { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Field, FormikHelpers } from "formik";
import { useAppDispatch } from "hooks/useAppDispatch";
import {
  changeEmail,
  changeError,
  selectEmail,
  selectError,
  selectFetchStatus,
  signIn,
} from "state/auth";
import { RequestStatus } from "state/shared/requestStatus";
import { useAppSelector } from "hooks/useAppSelector";
import { SignInFormValues } from "./types";
import { useInputsNavigation } from "hooks/useInputsNavigation";
import * as Yup from "yup";

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const wrapperRef = useRef(null);
  const email = useAppSelector(selectEmail);
  const status = useAppSelector(selectFetchStatus);
  const error = useAppSelector(selectError);
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);
  useInputsNavigation(wrapperRef);

  const onSubmit = (
    data: SignInFormValues,
    { setSubmitting }: FormikHelpers<SignInFormValues>
  ) => {
    setSubmitting(true);
    dispatch(
      signIn({
        email: data.email.trim(),
        password: data.password,
      })
    ).then(() => setSubmitting(false));
  };

  const onShowPasswordClick = () => {
    setIsPasswordRevealed(!isPasswordRevealed);
  };

  const onFormChanged = (e: any) => {
    if (error) {
      dispatch(changeError(""));
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={{
        email: email === null ? "" : email,
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, setFieldValue, submitForm, isSubmitting }) => (
        <Box
          component="form"
          onSubmit={(e: SyntheticEvent) => {
            e.preventDefault();
            submitForm();
          }}
          onChange={onFormChanged}
          ref={wrapperRef}
          sx={{
            flex: "1 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            width: "450px",
            paddingX: "60px",
            marginX: "auto",
          }}
        >
          <Field
            name="email"
            type="input"
            disabled={isSubmitting}
            error={errors.email && touched.email}
            helperText={errors.email && touched.email ? errors.email : ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFieldValue("email", e.target.value);
              dispatch(changeEmail(e.target.value));
            }}
            as={TextField}
            label="Email"
            variant="outlined"
          />
          <Field
            name="password"
            type={isPasswordRevealed ? "input" : "password"}
            disabled={isSubmitting}
            error={errors.password && touched.password}
            helperText={
              errors.password && touched.password ? errors.password : ""
            }
            as={TextField}
            label="Password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onShowPasswordClick}
                  >
                    {isPasswordRevealed ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            Sign In
          </Button>
          <Box height="54px">
            {isSubmitting && <LinearProgress />}
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
        </Box>
      )}
    </Formik>
  );
};

export default SignIn;
