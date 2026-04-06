import { prisma } from "../lib/prisma.js";

async function togglePostLike({ post_id, user_id }) { 
  try {
    const existing = await prisma.postLike.findUnique({
      where: {
        post_id_user_id: { post_id, user_id },
      },
    });
    if (existing) {
      await prisma.postLike.delete({
        where: {
          post_id_user_id: { post_id, user_id },
        },
      });
      return { liked: false };
    } else {
      await prisma.postLike.create({
        data: { post_id, user_id },
      });
      return { liked: true };
    }
  } catch (err) {
    console.error("Error toggling post like:", err);
    throw err;
  }
}

export {togglePostLike}