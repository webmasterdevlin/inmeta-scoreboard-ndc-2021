import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Lottie from "react-lottie";
import { Box, Button, Typography } from "@mui/material";

import drumData from "src/animations/drum.json";
import countDownData from "src/animations/countdown.json";
import medalData from "src/animations/medal.json";
import { PlayerModel } from "src/models/playerModel";
import { getAxios } from "src/axios/generic-api-calls";
import { EndPoints } from "src/axios/api-config";
import Layout from "src/components/Layout";
import { isAuthenticated } from "../utils/auth";

const RafflePage: NextPage = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [winner, setWinner] = useState<PlayerModel | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const drumOptions = {
    loop: true,
    autoplay: true,
    animationData: drumData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const countdownOptions = {
    loop: false,
    autoplay: true,
    animationData: countDownData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const medalOptions = {
    loop: true,
    autoplay: true,
    animationData: medalData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const auth = isAuthenticated();
    if (auth) setLoggedIn(true);

    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const { data } = await getAxios<PlayerModel>(EndPoints.players);
      setPlayers(data.sort((a, b) => b.points - a.points));
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleDrawRaffleV1 = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setWinner(players[Math.floor(Math.random() * players.length)]);
      setShowAnimation(false);
    }, 10000);
  };

  if (!loggedIn) {
    return (
      <Layout title="Raffle | inmeta">
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Typography variant={"h2"}>
            🗝️ Please login to use the scoreboard
          </Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="Raffle | inmeta">
      {winner && (
        <>
          <Lottie options={medalOptions} height={400} width={400} />
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box mb={4}>
              <Typography variant={"h4"}>
                <span style={{ color: "#00aaa1" }}>Name:</span> {winner?.name}
              </Typography>
              <Typography variant={"h4"}>
                <span style={{ color: "#00aaa1" }}>Email:</span> {winner?.email}
              </Typography>
              <Typography variant={"h4"}>
                <span style={{ color: "#00aaa1" }}>Mobile: </span>
                {winner?.mobile}
              </Typography>
            </Box>
          </Box>
        </>
      )}
      {showAnimation && (
        <>
          <Lottie options={countdownOptions} height={200} width={200} />
          <Lottie options={drumOptions} height={400} width={400} />
        </>
      )}

      {!showAnimation && !winner && (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Button
            onClick={handleDrawRaffleV1}
            size={"large"}
            variant={"contained"}
            style={{ color: "#fff" }}
            disabled={!players.length}
          >
            draw a winner
          </Button>
        </Box>
      )}
    </Layout>
  );
};

export default RafflePage;
