/**
 * User Service Module
 * -------------------
 * Handles all business logic related to users.
 * This service uses Prisma ORM for database operations.
 */

import { Prisma, User } from "@/generated/prisma/client";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";





/**
 * Get a user by ID.
 * @param {string} id - User ID.
 * @returns {Promise<User|null>} The user if found, else null.
 */
export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

/**
 * Get a user by email.
 * @param {string} email - User email address.
 * @returns {Promise<User|null>} The user if found, else null.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });

}
/**
 * Creates a new user and stores it in the database.
 * @warning Do NOT hash the password before calling; hashing is done internally.
 * @param {Object} data - User details.
 * @param {string} data.name - User's name.
 * @param {string} data.email - User's email.
 * @param {string} data.password - Plaintext password.
 * @param {"user"|"admin"} [data.role] - Optional user role (default: "user").
 * @returns {Promise<User>} Created user object.
 */
export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}): Promise<User> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role ?? "user",
      reviewCount: 0,
      gymRequestsCount: 0,
      isVerified: false,
    },
  });
};

/**
 * Updates the fields of a user record in the database.
 * Only the provided fields in `data` will be updated.
 *
 * @param {string} id - The unique ID of the user to update.
 * @param {Prisma.UserUpdateInput} data - Partial user data to update (e.g. name, email, password, etc.).
 * @returns {Promise<User>} The updated user object.
 *
 * @example
 * // Update user name and email
 * const updatedUser = await updateUser("user123", {
 *   name: "John Doe",
 *   email: "john@example.com"
 * });
 */
export const updateUser = async (id: string, data: Prisma.UserUpdateInput): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: { ...data }
  })
}

// Fetch all users
export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

