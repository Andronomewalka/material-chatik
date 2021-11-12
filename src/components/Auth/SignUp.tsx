import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { useDebounce } from "hooks/useDebounce";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const emailDebounced = useDebounce(email, 100);

  return (
    <Paper>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address reg</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>
    </Paper>
  );
};

export default SignUp;
