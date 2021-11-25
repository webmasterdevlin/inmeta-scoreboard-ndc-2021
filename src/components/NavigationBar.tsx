import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const NavigationBar = () => {
  const classes = useStyles();

  /* not using react-router to release the animation resource */

  return (
    <AppBar
      position="static"
      style={{ marginBottom: "2rem" }}
      color={"transparent"}
    >
      <Toolbar>
        <Box>
          <Button className={classes.button} color="inherit">
            <a href={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              home
            </a>
          </Button>
          <Button className={classes.button} color="inherit">
            <a
              href={"/raffle"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              raffle
            </a>
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
