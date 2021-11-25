import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { playerFind, playerSave } from "src/services/api/playerService";

const handler = nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const playeres = await playerFind();
      res.statusCode = 200;
      res.json(playeres);
    } catch (e) {
      console.log(e);
      res.statusCode = 500;
      res.json(e);
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
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
