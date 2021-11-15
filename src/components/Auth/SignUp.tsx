import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Field, Form, FormikHelpers, FormikProps } from "formik";
import { useAppDispatch } from "hooks/useAppDispatch";
import {
  changeError,
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
import { Link } from "react-router-dom";

let rawPasswordScore = 0;

const initialValidationRules: ValidationRule[] = [
  {
    id: 0,
    text: "At least 8 characters",
    isValid: false,
    validate: (input) => input?.length >= 8,
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
  const formikRef = useRef<FormikProps<SignUpFormValues>>(null);
  const wrapperRef = useRef(null);
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
    dispatch(signUp(data)).then(() => setSubmitting(false));
  };

  const onShowPasswordClick = () => {
    setIsPasswordRevealed(!isPasswordRevealed);
  };

  const onFormChanged = (e: any) => {
    if (error) {
      dispatch(changeError(""));
    }
  };

  const validateEmail = (email: string) => {
    let error;
    if (!email) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error = "Invalid email";
    }
    return error;
  };

  const validatePassword = (password: string) => {
    validationRules.forEach((rule) => {
      rule.isValid = rule.validate(password);
    });

    setPasswordScore(rawPasswordScore);
    setValidationRules([...validationRules]);
    setTimeout(() => {
      formikRef.current?.validateField("confPassword");
    }, 50);

    const allValid = validationRules.every((rule) => rule.isValid);
    if (!allValid) return "error";
  };

  const validatePassConfirmation = (pass: string, confPass: string) => {
    let error = undefined;
    if (pass && confPass) {
      if (pass !== confPass) {
        error = "Password not matched";
      }
    } else if (!confPass) error = "Required";
    return error;
  };

  return (
    <Box>
      <Formik
        ref={formikRef}
        initialValues={{
          email: "",
          password: "",
          confPassword: "",
        }}
        onSubmit={onSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form onChange={onFormChanged}>
            <Box
              ref={wrapperRef}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "strech",
                gap: "30px",
                width: "450px",
                padding: "40px 60px",
                margin: "0 auto 50px",
              }}
            >
              <Field
                name="email"
                type="input"
                required
                InputLabelProps={{ required: false }}
                disabled={isSubmitting}
                validate={validateEmail}
                as={TextField}
                label="Email"
                variant="outlined"
              />
              <Field
                name="password"
                type={isPasswordRevealed ? "input" : "password"}
                required
                InputLabelProps={{ required: false }}
                disabled={isSubmitting}
                validate={validatePassword}
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
                        {isPasswordRevealed ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                sx={{
                  width: "350px",
                  padding: "8px 16px 0",
                }}
              >
                <SignUpPasswordValidation
                  rules={validationRules}
                  score={passwordScore}
                  isPasswordEmpty={values.password.length === 0}
                />
              </Box>
              <Field
                name="confPassword"
                type={isPasswordRevealed ? "input" : "password"}
                required
                InputLabelProps={{ required: false }}
                disabled={isSubmitting}
                validate={(value: string) =>
                  validatePassConfirmation(values.password, value)
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
                        {isPasswordRevealed ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
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
                Submit
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
          </Form>
        )}
      </Formik>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Link to="/auth/sign-in">Sign In</Link>
      </Box>
    </Box>
  );
};

export default SignIn;
