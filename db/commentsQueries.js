import { prisma } from "../lib/prisma.js";

async function getAllComments() {
  try {
    return await prisma.comment.findMany({
      where: { isDeleted: false, isPublic:true},
      orderBy: { publishedAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
            message: true,
          },
        },
      },
    });
  } catch (err) {
    console.error("Error getting post:", err);
    throw err;
  }
}



async function getCommentsById(id) {
  try {
    return await prisma.comment.findUnique({
      where: { id },
    });
  } catch (err) {
    console.error(`Error getting comment ${id}`, err);
    throw err;
  }
}

async function postComment(userdata) {
  try {
    const { content, post_id, user_id } = userdata;

    const newComment = await prisma.comment.create({
      data: {
        content,
        post_id,
        user_id,
      },
    });
    return newComment;
  } catch (err) {
    console.error("Error inserting new comment", err);
    throw err;
  }
}

async function updateComment(userdata) {
  try {
    const { id, content } = userdata;
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: {
        content,
      },
    });
    return updatedComment;
  } catch (err) {
    console.error(`Error updating the comment ${userdata.id}`, err);
    throw err;
  }
}

async function deleteComment(id) {
  try {
    const deletedComment = await prisma.comment.update({
      where: { id },
      data: { isDeleted: true },
    });
    return deletedComment;
  } catch (err) {
    console.error(`Error eliminating the comment ${id}`, err);
    throw err;
  }
}

async function togglePublic({ id }) {
  try {
    const comment  = await prisma.comment.findUnique({
      where: {
        id: id,
      },
    });
    if(!comment) return null

  await prisma.comment.update({
      where: { id },
      data: { isPublic: !comment.isPublic }  
    })

      return { isPublic: !comment.isPublic }

  } catch (err) {
        console.error("Error toggling public:", err)
    throw err;
  }
}

export {
  getAllComments,
  getCommentsById,
  postComment,
  updateComment,
  deleteComment,
  togglePublic
};
