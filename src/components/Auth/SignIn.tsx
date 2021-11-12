import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import BoxContainer from "components/Common/BoxContainer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch } from "hooks/useAppDispatch";
import { signIn } from "state/auth";

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);

  const onShowPasswordClick = () => {
    setIsPasswordRevealed(!isPasswordRevealed);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      signIn({
        email,
        password,
      })
    );
  };

  return (
    <BoxContainer
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "strech",
          gap: "30px",
          width: "450px",
          padding: "40px 60px",
          marginBottom: "50px",
        }}
        component="form"
        onSubmit={onSubmit}
      >
        <TextField
          label="Email"
          variant="outlined"
          required
          InputLabelProps={{ required: false }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type={isPasswordRevealed ? "text" : "password"}
          required
          InputLabelProps={{ required: false }}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </Box>
    </BoxContainer>
  );
};

export default SignIn;
