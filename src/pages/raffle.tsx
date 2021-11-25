import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Lottie from "react-lottie";
import { Box, Button, Typography } from "@mui/material";

import drumData from "src/animations/drum.json";
import countDownData from "src/animations/countdown.json";
import congratsData from "src/animations/congratulation.json";
import { PlayerModel } from "src/models/playerModel";
import { getAxios } from "src/axios/generic-api-calls";
import { EndPoints } from "src/axios/api-config";
import Layout from "src/components/Layout";

const RafflePage: NextPage = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [winner, setWinner] = useState<PlayerModel | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const animation1: any = useRef<Lottie>(null);
  const animation2: any = useRef<Lottie>(null);
  const animation3: any = useRef<Lottie>(null);
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

  const congratsOptions = {
    loop: false,
    autoplay: true,
    animationData: congratsData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    fetchPlayers().then();

    return () => {
      // cleanup
      animation1.current && animation1.current.reset();
      animation2.current && animation2.current.reset();
      animation3.current && animation3.current.reset();
    };
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

  return (
    <Layout title="Raffle | inmeta">
      {winner && (
        <>
          <Lottie
            ref={animation1}
            options={congratsOptions}
            height={400}
            width={400}
          />
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
          <Lottie
            ref={animation2}
            options={countdownOptions}
            height={200}
            width={200}
          />
          <Lottie
            ref={animation3}
            options={drumOptions}
            height={400}
            width={400}
          />
        </>
      )}

      {!showAnimation && !winner && (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Button
            onClick={handleDrawRaffleV1}
            size={"large"}
            variant={"contained"}
            style={{ color: "#fff" }}
          >
            draw a winner
          </Button>
        </Box>
      )}
    </Layout>
  );
};

export default RafflePage;
