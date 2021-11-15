import React from "react";
import { SignUpPasswordValidationProp } from "./types";
import { Box } from "@mui/material";

const IsValidIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -5 55 55"
    width="20px"
    height="20px"
  >
    <path
      fill="#bae0bd"
      d="M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z"
    />
    <path
      fill="#5e9c76"
      d="M20,2c9.9,0,18,8.1,18,18s-8.1,18-18,18S2,29.9,2,20S10.1,2,20,2 M20,1C9.5,1,1,9.5,1,20s8.5,19,19,19	s19-8.5,19-19S30.5,1,20,1L20,1z"
    />
    <path
      fill="none"
      stroke="#fff"
      strokeMiterlimit="10"
      strokeWidth="3"
      d="M11.2,20.1l5.8,5.8l13.2-13.2"
    />
  </svg>
);

const IsNotValidIcon = () => (
  <svg
    fill="#000000"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -6 70 70"
    width="20px"
    height="20px"
  >
    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z" />
  </svg>
);

const SignUpPasswordValidation: React.FC<SignUpPasswordValidationProp> = ({
  rules,
  score,
  isPasswordEmpty,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
          height: "4px",
          margin: "8px 0 4px",
        }}
      >
        <span
          style={{ background: defineScoreBarColor(isPasswordEmpty, score, 0) }}
        />
        <span
          style={{ background: defineScoreBarColor(isPasswordEmpty, score, 1) }}
        />
        <span
          style={{ background: defineScoreBarColor(isPasswordEmpty, score, 2) }}
        />
      </Box>
      <Box
        component="ul"
        sx={{
          display: "grid",
          flexWrap: "wrap",
          gridTemplateColumns: "repeat(2, 1fr)",
          fontSize: "0.85em",
        }}
      >
        {rules.map((rule) => (
          <Box
            key={rule.id}
            component="li"
            sx={{
              color: rule.isValid ? "success" : "grey",
            }}
          >
            {rule.isValid ? <IsValidIcon /> : <IsNotValidIcon />}
            {rule.text}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default SignUpPasswordValidation;

function defineScoreBarColor(
  isPasswordEmpty: boolean,
  score: number,
  position: number
): string {
  if (isPasswordEmpty) return "rgba(156, 163, 175, 1)";
  else if (score === 0 && position === 0) return "rgba(239, 68, 68, 1)";
  else if (score === 1 && position < 2) return "rgba(251, 191, 36, 1)";
  else if (score > 1) return "rgba(16, 185, 129, 1)";
  return "rgba(156, 163, 175, 1)";
}
