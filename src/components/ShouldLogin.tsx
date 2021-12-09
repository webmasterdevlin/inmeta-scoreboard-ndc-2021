import React from "react";
import { Box, Typography } from "@mui/material";
import Layout from "./Layout";

type Prop = {
  title: string;
};

const ShouldLogin = ({ title }: Prop) => {
  return (
    <Layout title={title}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Box mr={4}>
          <img src={"https://placehold.jp/250x250.png"} alt="logo" />
        </Box>
        <Typography variant={"h2"}>
          Please login to use the leaderboard.
        </Typography>
      </Box>
    </Layout>
  );
};

export default ShouldLogin;
