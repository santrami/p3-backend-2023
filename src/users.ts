import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

// endpoints for user routes

//get all users
router.get(
  "/",
  errorChecked(async (req, res, next) => {
    const result = await prisma.user.findMany();
    res.status(200).json(result);
  })
);

//get one user
router.get(
  "/:id",
  errorChecked(async (req, res, next) => {
    const { id } = req.params;
    const getUser = await prisma.user.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    res.json(getUser);
  })
);

//create a new user
router.post(
  "/",
  errorChecked(async (req, res, next) => {
    //const { name, surname, username, email, password } = await req.body;
    const newUser = await prisma.user.create({
      //or I can just send req.body, not name, surname, email, password.
      data: req.body,
      /* name,surname,username,email,password, */
    });
    res.status(200).send(newUser);
  })
);

//update a user
router.put(
  "/:id",
  errorChecked(async (req, res, next) => {
    const { id } = req.params;
    const updateUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.json(updateUser);
  })
);

//delete user
router.delete(
  "/:id",
  errorChecked(async (req, res, next) => {
    const { id } = req.params;
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deleteUser);
  })
);

export default router;
