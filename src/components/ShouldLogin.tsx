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
          <img
            src={
              "https://media-exp1.licdn.com/dms/image/C4D0BAQH5qV73iHr5EA/company-logo_200_200/0/1636097900134?e=1646265600&v=beta&t=Ywoo9kDzC5Jd1cw4dFvHB6EW1Zj8pbj0eXY8BBC86b8"
            }
            alt="inmeta"
          />
        </Box>
        <Typography variant={"h2"}>
          Please login to use the scoreboard
        </Typography>
      </Box>
    </Layout>
  );
};

export default ShouldLogin;
