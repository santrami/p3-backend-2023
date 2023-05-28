import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";

const router = Router({ mergeParams: true });

router.post(
  "/:followId",
  errorChecked(async (req, res) => {
    const like = await prisma.follow.create({
      data: {
        followingId: Number(req.params.followId),
        followerId: Number(req.params.userId),
      },
    });
    res.status(200).json(like);
  })
);

router.delete(
  "/:followingId",
  errorChecked(async (req, res) => {
    const unfollow = await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: Number(req.params.userId),
          followingId: Number(req.params.followingId),
        },
      },
    })
    res.status(200).json({ unfollow, params: req.params });
  })
);
export default router;