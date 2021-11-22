import "reflect-metadata";
import { Typography } from "@mui/material";

import Layout from "src/components/Layout";

export default function Home() {
  return (
    <Layout title="Home | Next.js Redux Toolkit + TypeORM Example">
      <Typography variant={"h2"}>
        Scoreboard
      </Typography>
    </Layout>
  );
}
