import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import usersRouter from "./users.js";
import { defaultHandlerError } from "./utils.js";

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/users", usersRouter);
 
app.use(defaultHandlerError);

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`listening on port : ${port}`); 
});
