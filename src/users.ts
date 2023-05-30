import { Router, Request } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import postsRouter from "./posts.js";
import followRouter from "./follow.js";
import bcrypt from "bcryptjs"

const router = Router();

// user routes - endpoints

//get all users
router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.user.findMany();
    res.status(200).json(result);
  })
);

//get one user
router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params; // no longer needed because of interface RequestWithUserId
    const getUser = await prisma.user.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    res.json(getUser);
  })
);

//create a new user
router.post(
  "/",
  errorChecked(async (req, res) => {
    const userChecked = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (userChecked) {
      return res.status(409).json({ message: 'usuario ya existe'});
    }
    else {
      const hassedPass= await bcrypt.hash(req.body.password, 10);

      const newUser = await prisma.user.create({
        data: {
          ...req.body,
          password: hassedPass
        },
      });
      res.status(200).send(newUser);
    }
  })
);

//update a user
router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params; // no longer needed because of interface RequestWithUserId
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
  errorChecked(async (req, res) => {
    const { id } = req.params; // no longer needed because of interface RequestWithUserId
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deleteUser);
  })
);

router.use("/:userId/posts", postsRouter);
router.use("/:userId/follow", followRouter);

export default router;
