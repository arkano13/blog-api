import {
  getAllComments,
  getCommentsById,
  postComment,
  updateComment,
  deleteComment,
  togglePublic
} from "../db/commentsQueries.js";

import { validationResult } from "express-validator"

const commentsGet = async (req, res) => {
  try {
    const comments = await getAllComments();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const commentGetById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await getCommentsById(Number(id));
    if (!comment) {
      return res.status(404).json({ message: " not found" });
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const commentPost = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { content } = req.body;
    const { id } = req.params;
    await postComment({ content, post_id: Number(id), user_id: req.user.id });
    res.status(201).json({ message: "comment created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const commentUpdate = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { id } = req.params;
    const { content } = req.body;
    await updateComment({ id: Number(id), content });
    res.status(200).json({ message: "comment updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const commentDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteComment(Number(id));
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


const togglePublicComments = async (req, res) => {
  try {
    const { id } = req.params;
   const result = await togglePublic({ id: Number(id) }) 
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export  {
  commentsGet,
  commentGetById,
  commentPost,
  commentUpdate,
  commentDelete,
  togglePublicComments
};
