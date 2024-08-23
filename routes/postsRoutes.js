import express from "express";
import * as postsCtrl from "../controllers/postsController.js";

const router = express.Router();

router.get("/posts/:id", postsCtrl.getPost);
router.get("/posts", postsCtrl.getPosts);
router.post("/posts", postsCtrl.createPost);
router.delete("/posts/:id", postsCtrl.deletePost);
router.get("/newpost/:id", postsCtrl.getNewPost);
router.put("/newpost/:id", postsCtrl.updatePost);

export default router;
