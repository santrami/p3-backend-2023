import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";
import { RequestWithUserId } from "./users.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req: RequestWithUserId, res,next) => {
    const posts = await prisma.post.findMany({
      where: {
        authorId: req.userId,
      },
    });
    //if(posts.length !== 0){
        res.status(200).json(posts);
    //}
    //next()
  })
);

router.post(
  "/",
  errorChecked(async (req: RequestWithUserId, res) => {
    const newPost = await prisma.post.create({
      data: {
        ...req.body,
        authorId: req.userId,
      },
    });
    res.status(200).json(newPost);
  })
);

/* router.put("/", errorChecked(async (req, res) => {

})
); */

export default router;
