import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface BreakpointOverrides {
      xs: true;
      xsm: true;
      sm: true;
      md: true;
      lg: true;
      xl: true;
    }
  }

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        xsm: 450,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    }
  });

  export default theme;