import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { playerFind, playerSave } from "src/services/api/playerService";

// GET and POST for /api/players

const handler = nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers["x-auth"];
    if (token !== "inmeta") {
      res.status(401).json({ msg: "No token" });
      return;
    }

    try {
      const players = await playerFind();
      res.statusCode = 200;
      res.json(players);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.json(e);
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers["x-auth"];
    if (token !== "inmeta") {
      res.status(401).json({ msg: "No token" });
      return;
    }

    try {
      const player = await playerSave(req.body);
      res.statusCode = 201;
      res.json({ ...player });
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  });

export default handler;
