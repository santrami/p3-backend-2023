import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";
import likeRouter from './like.js'

const router = Router({ mergeParams: true });

router.get(
  "/",
  errorChecked(async (req, res) => {
    const posts = await prisma.post.findMany({
      where: {
        authorId: Number(req.params.id),
      },
    });
    if (posts.length !== 0) {
      res.status(200).json(posts);
    } else {
      throw new Error("No messages");
    }
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newPost = await prisma.post.create({
      data: {
        ...req.body,
        authorId: Number(req.params.id),
      },
    });
    res.status(200).json(newPost);
  })
);

router.put(
  "/:postId",
  errorChecked(async (req, res) => {
    const updatedPost = await prisma.post.update({
      where: {
        id: Number(req.params.postId),
      },
      data: {
        ...req.body,
        authorId: Number(req.params.userId),
      },
    });
    res.status(200).json(updatedPost);
  })
);

router.delete("/:postId", (req, res) => {
  const deletedPost = prisma.post.delete({
    where: { 
      id: Number(req.params.postId) 
    },
  });
});

router.use("/:postId/like", likeRouter)

export default router;
