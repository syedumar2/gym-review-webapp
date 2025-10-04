// /services/userService.ts

import { User } from "@/generated/prisma/client";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

// Fetch all users
export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

// Fetch a user by ID
export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};


export const getUserByEmail = async(email:string): Promise<User|null> => {
    return prisma.user.findUnique({ where: { email } });

}
// Create a new user (signup)
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

// Verify user for login
export const verifyUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
};
