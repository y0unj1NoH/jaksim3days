import Posts from "../models/posts.js";
import { ObjectId } from "mongodb";

export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.getAll();
    console.log(posts);
    res.render("posts", { posts: posts });
  } catch (e) {
    console.error(e);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Posts.getOne(new ObjectId(req.params.id));
    if (!post) {
      return res.status(404).send("게시물을 찾을 수 없습니다.");
    }
    res.render("detail", { post: post });
  } catch (e) {
    console.error(e);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
};

export const createPost = async (req, res) => {
  try {
    await Posts.create(req.body);
    res.redirect("posts");
  } catch (e) {
    console.error(e);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
};

export const deletePost = async (req, res) => {
  try {
    const result = await Posts.delete(new ObjectId(req.params.id));

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Not found", success: false });
    } else {
      return res.json({ message: "success", success: true });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "error", success: false });
  }
};

export const getNewPost = async (req, res) => {
  try {
    const post = await Posts.getOne(new ObjectId(req.params.id));
    if (!post) {
      return res.status(404).send("게시물을 찾을 수 없습니다.");
    }
    res.render("newpost", { post: post });
  } catch (e) {
    console.error(e);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
};

export const updatePost = async (req, res) => {
  try {
    const result = await Posts.update(new ObjectId(req.params.id), req.body);
    if (result.modifiedCount === 1) {
      return res.json({
        message: "success",
        success: true,
        redirectUrl: `/posts/${req.params.id.toString()}`
      });
    } else {
      return res.status(404).json({ message: "Not found", success: false });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "error", success: false });
  }
};
