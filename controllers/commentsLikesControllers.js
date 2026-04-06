
import { toggleCommentLike } from "../db/commentsLikesQueries.js";

const postComment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await toggleCommentLike({
      comment_id: Number(id),
      user_id: req.user.id,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export { postComment }