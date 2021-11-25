import { createTheme } from "@mui/material";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#00aaa1",
    },
    secondary: {
      main: "#FB8787",
    },
    error: {
      main: "#F44335",
    },
    background: {
      default: "#F5F2EF",
    },
  },
});

export default theme;
