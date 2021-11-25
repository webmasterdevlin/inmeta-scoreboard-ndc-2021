import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import {
  playerFindById,
  playerFindByIdAndRemove,
  playerFindByIdAndUpdate,
} from "src/services/api/playerService";

// GET, DELETE, and PUT for /api/players/:id

const handler = nc()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.query.id as string;
      const player = await playerFindById(id);
      res.status(200).json(player);
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.query.id as string;
      await playerFindByIdAndRemove(id);
      res.statusCode = 204;
      res.send("DELETED");
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  })
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.query.id as string;
      await playerFindByIdAndUpdate(id, req.body);
      res.statusCode = 200;
      res.send("UPDATED");
    } catch (e) {
      res.statusCode = 500;
      res.json(e);
    }
  });

export default handler;
