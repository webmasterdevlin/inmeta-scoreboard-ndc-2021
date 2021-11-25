import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Link from "next/link";

const NavigationBar = () => {
  const classes = useStyles();

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
        </Box>
      </Toolbar>
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
