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
  signUp,
} from "state/auth";
import { RequestStatus } from "state/shared/requestStatus";
import { useAppSelector } from "hooks/useAppSelector";
import { SignUpFormValues, ValidationRule } from "./types";
import { useInputsNavigation } from "hooks/useInputsNavigation";
import SignUpPasswordValidation from "./SignUpPasswordValidation";
import zxcvbn from "zxcvbn";
import * as Yup from "yup";

let rawPasswordScore = 0;

const initialValidationRules: ValidationRule[] = [
  {
    id: 0,
    text: "At least 8 characters",
    isValid: false,
    validate: (input) => input.length >= 8,
  },
  {
    id: 1,
    text: "Not commonly used",
    isValid: false,
    validate: (input) => {
      rawPasswordScore = input.length > 20 ? 3 : zxcvbn(input).score;
      return rawPasswordScore > 1;
    },
  },
  {
    id: 2,
    text: "Upper & lowercase",
    isValid: false,
    validate: (input) => /[a-z]/.test(input) && /[A-Z]/.test(input),
  },
  {
    id: 3,
    text: "Numbers and symbols",
    isValid: false,
    validate: (input) => /[0-9]/.test(input) && /[-+_=!@#$%^&*.,?]/.test(input),
  },
];

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const wrapperRef = useRef(null);
  const email = useAppSelector(selectEmail);
  const status = useAppSelector(selectFetchStatus);
  const error = useAppSelector(selectError);
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);
  const [validationRules, setValidationRules] = useState(
    initialValidationRules
  );
  const [passwordScore, setPasswordScore] = useState(0);
  useInputsNavigation(wrapperRef);

  const onSubmit = (
    data: SignUpFormValues,
    { setSubmitting }: FormikHelpers<SignUpFormValues>
  ) => {
    setSubmitting(true);
    dispatch(
      signUp({
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

  const validatePassword = (password: string | undefined, context: any) => {
    validationRules.forEach((rule) => {
      rule.isValid = rule.validate(password ?? "");
    });
    setPasswordScore(rawPasswordScore);
    setValidationRules([...validationRules]);
    const isAllValid = validationRules.every((rule) => rule.isValid);
    return isAllValid;
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email")
      .required("Required"),
    password: Yup.string()
      .test("password validation", "", validatePassword)
      .required("Required"),
    confPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords not matched")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{
        email: email === null ? "" : email,
        password: "",
        confPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        submitForm,
        isSubmitting,
      }) => (
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Field
              name="password"
              type={isPasswordRevealed ? "input" : "password"}
              disabled={isSubmitting}
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
            <SignUpPasswordValidation
              rules={validationRules}
              score={passwordScore}
              isPasswordEmpty={values.password.length === 0}
            />
          </Box>
          <Field
            name="confPassword"
            type={isPasswordRevealed ? "input" : "password"}
            disabled={isSubmitting}
            error={errors.confPassword && touched.confPassword}
            helperText={
              errors.confPassword && touched.confPassword
                ? errors.confPassword
                : ""
            }
            as={TextField}
            label="Confirm password"
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
            Sign Up
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
