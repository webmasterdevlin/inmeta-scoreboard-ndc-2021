import React from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <AppBar position="static" color="secondary">
        <Container maxWidth="md">
          <Toolbar>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography>© 2021</Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </footer>
  );
};

export default Footer;
