import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Request, Response } from "express";
import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.findMany();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send({ type: e.constructor.name, message: e.toString() });
  }
});

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`listening on port : ${port}`);
});
