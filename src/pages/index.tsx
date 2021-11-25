import "reflect-metadata";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import Lottie from "react-lottie";

import animationData from "src/animations/pacman.json";
import { PlayerModel } from "src/models/playerModel";
import { getAxios, postAxios } from "src/axios/generic-api-calls";
import { EndPoints } from "src/axios/api-config";
import NewPlayerForm from "src/components/NewPlayerForm";
import Layout from "src/components/Layout";

const HomePage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const navigate = useRouter();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const { data } = await getAxios<PlayerModel>(EndPoints.players);
      setPlayers(data.sort((a, b) => b.points - a.points));
    } catch (e: any) {
      alert(e.message);
    }
    setLoading(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (player: PlayerModel) => {
    try {
      const { data } = await postAxios<PlayerModel>(EndPoints.players, player);
      setPlayers([...players, data]);
      handleClose();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Layout title="Scoreboard | inmeta">
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Typography variant={"h2"}>Scoreboard</Typography>
        <Lottie options={defaultOptions} height={100} width={400} />
      </Box>
      <div className={classes.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          {loading ? "Loading players..." : "Players"}
        </Typography>
        <Button
          onClick={handleClickOpen}
          variant={!players.length ? "contained" : "outlined"}
          color="secondary"
          startIcon={<PersonAdd />}
        >
          New Player
        </Button>
      </div>
      <div style={{ height: "100vh", width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Points</TableCell>
                <TableCell align="right">Company</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((p) => (
                <TableRow
                  key={p.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => navigate.push(`/player/${p.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell component="th" scope="row">
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                    >
                      <img
                        src={`https://eu.ui-avatars.com/api/?background=00aaa1&color=fff&name=${p.name}`}
                        alt={p.name}
                        width={"40rem"}
                        height={"40rem"}
                      />
                      <Box ml={2}>
                        <Typography fontSize={"x-large"}>{p.name}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontSize={"x-large"}>{p.points}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontSize={"x-large"}>{p.company}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <NewPlayerForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default HomePage;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  content: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));
