import { togglePostLike } from "../db/postLikesQueries.js";

const postLike = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await togglePostLike({
      post_id: Number(id),
      user_id:  Number(req.user.id)
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export { postLike }