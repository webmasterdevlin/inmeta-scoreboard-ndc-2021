import React, { useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { PlayerModel } from "src/models/playerModel";
import {
  deleteAxios,
  getByIdAxios,
  putAxios,
} from "src/axios/generic-api-calls";
import { EndPoints } from "src/axios/api-config";

import { EditPlayerForm } from "src/components/EditPlayerForm";
import Layout from "src/components/Layout";

type Props = {
  id: string;
  errors: string;
};

const PlayerPage: NextPage<Props> = ({ id }) => {
  const [player, setPlayer] = useState<PlayerModel>({} as PlayerModel);
  const [open, setOpen] = useState(false);

  const navigate = useRouter();
  useEffect(() => {
    fetchPlayer().then();
  }, []);

  const fetchPlayer = async () => {
    const { data } = await getByIdAxios<PlayerModel>(
      EndPoints.players,
      id as string
    );
    setPlayer(data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (player: PlayerModel) => {
    try {
      await putAxios<PlayerModel>(EndPoints.players, player.id, player);
      setPlayer(player);
      handleClose();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleDelete = async () => {
    const answer = window.confirm(
      "Are you sure you want to delete this player?"
    );
    if (!answer) return;

    try {
      await deleteAxios(EndPoints.players, player.id);
      navigate.push("/");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <Layout title="Player Details | inmeta">
      <Box mb={4}>
        <Typography variant={"h2"}>Player Details</Typography>
      </Box>
      <Box mb={4}>
        <Typography variant={"h4"}>Name: {player?.name}</Typography>
        <Typography variant={"h4"}>Email: {player?.email}</Typography>
        <Typography variant={"h4"}>Mobile: {player?.mobile}</Typography>
        <Typography variant={"h4"}>Points: {player?.points}</Typography>
      </Box>
      <Box display={"flex"} flexDirection={"row"}>
        <Box mr={4}>
          <Button
            onClick={handleDelete}
            variant={"outlined"}
            color="warning"
            startIcon={<Delete />}
          >
            Delete Player
          </Button>
        </Box>
        <Button
          onClick={handleClickOpen}
          variant={"contained"}
          color="secondary"
          startIcon={<Edit />}
          style={{ color: "#fff" }}
        >
          Edit Player
        </Button>
      </Box>
      <div style={{ height: "100vh", width: "100%" }}>
        <EditPlayerForm
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
          player={player}
        />
      </div>
    </Layout>
  );
};

export default PlayerPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params.id as string;
    // const { data } = await getByIdAxios<PlayerModel>(EndPoints.players, id);
    return { props: { id } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
