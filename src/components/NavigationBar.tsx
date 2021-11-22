import React, { Component } from "react";
import { connect, MapDispatchToProps } from "react-redux";

import { AppBar, Box, Link, Theme, Toolbar } from "@mui/material";
import { withStyles } from "@mui/styles";

import { fetchHeroes } from "src/features/heroes/heroActions";
import { RootState } from "src/store";

/*local state's shape*/
interface IState {}

/*props' shape*/
interface IProps {
  classes: any;
  fetchHeroes: () => Promise<void>;
}

class NavigationBar extends Component<IProps, IState> {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" style={{ marginBottom: "2rem" }}>
        <Toolbar>
          inmeta
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    heroStore: state.heroStore,
  };
};

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, any>) => {
  return {
    fetchHeroes: async () => await dispatch(fetchHeroes()),
  };
};

const styles: any = (theme: Theme) => ({
  button: {
    margin: "0 0.5rem",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
);
