import { prisma } from "../lib/prisma.js";

async function getAllPost(userId = null) {
  try {
    return await prisma.post.findMany({
      where: { isDeleted: false, isPublic: true },
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
        _count: {
          select: { likes: true, comments: true },
        },
        likes: userId ? {  
          where: { user_id: userId },
          select: { user_id: true },
        }: false,
      },
    });
  } catch (err) {
    console.error("Error getting post:", err);
    throw err;
  }
}


async function getPostById(id) {
  try {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
          }
        },
        comments: {
          where: { isDeleted: false, isPublic: true },
          orderBy: { publishedAt: "desc" },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                firstname: true,
                lastname: true,
              }
            }
          }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      }
    });
  } catch (err) {
    console.error(`Error getting post ${id}`, err);
    throw err;
  }
}


async function postFile(userdata) {
  try {
    const { title, message, user_id } = userdata;

    const newPost = await prisma.post.create({
      data: {
        title,
        message,
        user_id,
      },
    });
    return newPost;
  } catch (err) {
    console.error("Error inserting new", err);
    throw err;
  }
}

async function updatePost(userdata) {
  try {
    const { id, title, message, user_id, publishedAt } = userdata;
    const updatePost = await prisma.post.update({
      where: { id },
      data: {
        title,
        message,
      },
    });
    return updatePost;
  } catch (err) {
    console.error(`Error updating the post ${userdata.id}`, err);
    throw err;
  }
}

async function deletePost(id) {
  try {
    const deletedPost = await prisma.post.update({
      where: { id },
      data: { isDeleted: true },
    });
    return deletedPost;
  } catch (err) {
    console.error(`Error eliminating the post ${id}`, err);
    throw err;
  }
}

async function togglePublic({ id }) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) return null;

    await prisma.post.update({
      where: { id },
      data: { isPublic: !post.isPublic },
    });

    return { isPublic: !post.isPublic };
  } catch (err) {
    console.error("Error toggling public:", err);
    throw err;
  }
}

export {
  getAllPost,
  getPostById,
  postFile,
  updatePost,
  deletePost,
  togglePublic,
};
