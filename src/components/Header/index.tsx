import { SyntheticEvent, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  AppBar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { AccountCircle, Search, Menu as MenuIcon } from "@mui/icons-material";

const Header = () => {
  const theme = useTheme();
  const isUpXsmScreen = useMediaQuery(theme.breakpoints.up("xsm"));
  const [accountAnchor, setAccountAnchor] = useState<Element | null>(null);

  const openAccountPopup = (event: SyntheticEvent) => {
    setAccountAnchor(event.currentTarget);
  };

  const closeAccountPopup = () => {
    setAccountAnchor(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <LogoContainer>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          {isUpXsmScreen && <LogoText variant="h6">Chatik</LogoText>}
        </LogoContainer>

        <SearchContainer>
          <Search />
          <InputBase
            sx={{ width: "100%", color: "inherit", paddingLeft: 1 }}
            placeholder="Search..."
          />
        </SearchContainer>

        <IconButton
          size="large"
          sx={{ marginRight: -2 }}
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={openAccountPopup}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={accountAnchor}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(accountAnchor)}
          onClose={closeAccountPopup}
        >
          <MenuItem onClick={closeAccountPopup}>Profile</MenuItem>
          <MenuItem onClick={closeAccountPopup}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

const LogoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("xs")]: {
    marginRight: theme.spacing(1),
  },
  [theme.breakpoints.up("xsm")]: {
    marginRight: theme.spacing(2),
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  display: "none",
  marginRight: 10,
  letterSpacing: 2,
  textTransform: "uppercase",
  [theme.breakpoints.up("xsm")]: {
    display: "block",
  },
}));

const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  padding: theme.spacing(0.5, 1, 0, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up("xs")]: {
    marginRight: theme.spacing(0),
  },
  [theme.breakpoints.up("xsm")]: {
    marginRight: theme.spacing(4),
  },
}));
