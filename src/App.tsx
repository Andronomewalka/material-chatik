import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import theme from "./utils/theme";
import Chat from "./pages/Chat";
import { Routes } from "react-router-dom";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Box, Stack } from "@mui/material";

function App() {
  return (
    <>
      <GlobalStyles
        styles={(theme) => ({
          html: { height: "100%" },
          body: { height: "100%", overflow: "hidden" },
          "*": { boxSizing: "border-box" },
        })}
      />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Stack
            height="100%"
            direction="column"
            justifyContent="strech"
            alignItems="stretch"
          >
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Chat />}></Route>
                <Route path="/chat" element={<Chat />}></Route>
              </Routes>
            </Box>
          </Stack>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
