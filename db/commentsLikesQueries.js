import { prisma } from "../lib/prisma.js";


async function toggleCommentLike({comment_id, user_id}) {
  try {
    const existing = await prisma.commentLike.findUnique({
      where: {
        comment_id_user_id: { comment_id, user_id }
      }
    })

    if (existing) {
      await prisma.commentLike.delete({
        where: {
          comment_id_user_id: { comment_id, user_id }
        }
      })
      return { liked: false }
    } else {
      await prisma.commentLike.create({
        data: { comment_id, user_id }
      })
      
      return { liked: true }
    }
    
  } catch (err) {
    console.error("Error toggling comment like:", err)
    throw err
  }
}

export {toggleCommentLike} 