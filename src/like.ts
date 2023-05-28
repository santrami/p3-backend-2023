import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";

const router = Router({ mergeParams: true });

router.post(
  "/",
  errorChecked(async (req, res) => {
    const like = await prisma.like.create({
      data: {
        postId: Number(req.params.postId),
      },
    });
    res.status(200).json(like);
  })
);

router.delete(
  "/",
  errorChecked(async (req, res) => {
    const unlike = await prisma.like.delete({
      where: {
        postId: Number(req.params.postId),
      },
    });
    res.status(200).json({unlike,params: req.params});
  })
);
export default router;