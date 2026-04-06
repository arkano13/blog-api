import {
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
  togglePublic,
} from "../db/adminQueries.js";

import { Result, validationResult } from "express-validator";


const postsGet = async (req, res) => {
  try {
      const userId = req.user?.id || null
    const post = await getAllPost(userId);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const postGetById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await getPostById(Number(id));
    if (!post) {
      return res.status(404).json({ message: " not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const postUpdate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const { title, message } = req.body;
    await updatePost({ id: Number(id), title, message });
    res.status(200).json({ message: "post updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const postDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePost(Number(id));
    res.status(200).json({ message: "post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const togglePublicPost = async (req, res) => {
  try {
    const { id } = req.params;
   const result = await togglePublic({ id: Number(id) })  
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export { postsGet, postGetById, postUpdate, postDelete,togglePublicPost }