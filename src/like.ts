import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";

const router = Router({ mergeParams: true });

