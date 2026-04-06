import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

async function getUsername(username) {
  try {
    return await prisma.users.findUnique({
      where: { username },
    });
  } catch (err) {
    console.error("Error getting user by username:", err);
    throw err;
  }
}

async function getUserById(id) {
  try {
    return await prisma.users.findUnique({
      where: { id },
    });
  } catch (err) {
    console.error("Error getting user by Id:", err);
    throw err;
  }
}

async function postUser(userdata) {
  try {
    const { firstname, lastname, password, username } = userdata
    const newUser = await prisma.users.create({
      data: {
        firstname,
        lastname,
        password,
        username,
      },
    })
    return newUser
  } catch (err) {
    console.error("Error creating a new user", err)
    throw err
  }
}

export { getUsername, getUserById, postUser };
