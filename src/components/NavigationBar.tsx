import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { useRouter } from "next/router";

const NavigationBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useRouter();

  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    if (!token || token !== "inmeta") {
      await navigate.push("/");
    } else {
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar
      position="static"
      style={{ marginBottom: "2rem" }}
      color={"transparent"}
    >
      <Toolbar>
        <Box>
          <Button className={classes.button} color="inherit">
            <Link href={"/"} passHref>
              <span style={{ textDecoration: "none", color: "inherit" }}>
                home
              </span>
            </Link>
          </Button>
          <Button className={classes.button} color="inherit">
            <Link href={"/raffle"} passHref>
              <span style={{ textDecoration: "none", color: "inherit" }}>
                raffle
              </span>
            </Link>
          </Button>
          <Button
            className={classes.button}
            color="inherit"
            onClick={handleClickOpen}
            disabled={loggedIn}
          >
            <span style={{ textDecoration: "none", color: "inherit" }}>
              {loggedIn ? "logout" : "login"}
            </span>
          </Button>
        </Box>
      </Toolbar>
      <LoginForm open={open} onClose={handleClose} />
    </AppBar>
  );
};

export default NavigationBar;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: "0 0.5rem",
      "&:focus": {
        outline: "none",
      },
    },
  })
);
