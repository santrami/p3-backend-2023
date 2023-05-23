import { Router } from "express";
import prisma from "./prisma-client.js";

const router = Router();

// endpoints for user routes

//get all users
router.get("/", async (req, res,next) => {
  try {
    const result = await prisma.user.findMany();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

//get one user
router.get("/:id", async (req, res,next) => {
  try {
    const { id } = req.params;
    const getUser = await prisma.user.findUniqueOrThrow({
      where: { id: Number(id) }
    });
    res.json(getUser);
  } catch (e) {
    next(e);
  }
});

//create a new user
router.post("/", async (req, res,next) => {
  try {
    const { name, surname, username, email, password } = await req.body;
    const newUser = await prisma.user.create({
        //or I can just send req.body
      data: {
        name,
        surname,
        username,
        email,
        password,
      },
    });
    res.status(200).send(newUser);
  } catch (e) {
    next(e)
  }
});

//update a user
router.put("/:id", async (req, res,next) => {
  try {
    const { id } = req.params;
    const updateUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.json(updateUser);
  } catch (e) {
    next(e)
  }
});

//delete user
router.delete("/:id", async (req, res,next) => {
  try {
    const { id } = req.params;
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deleteUser);
  } catch (e) {
    next(e)
  }
});

export default router;