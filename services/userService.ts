/**
 * User Service Module
 * -------------------
 * Handles all business logic related to users.
 * This service uses Prisma ORM for database operations.
 */

import { GymRequest, Prisma, User } from "@/generated/prisma/client";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import { GymRequestObjectCreationInput } from "@/types/gym";





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



/**
 * Creates a new gym request in the database.
 * 
 * @param {GymRequestObjectCreationInput} data - Gym request details (name, description, address, plans, amenities, contact info, userId) and images.
 * @returns {Promise<GymRequest>} The created gym request.
 *
 * @example
 * const gym = await createGymRequest({
 *   gymName: "Powerhouse Gym",
 *   description: "Fully equipped fitness center",
 *   address: { address: "123 Main St", city: "Mumbai", state: "MH" },
 *   membershipPlans: [{ planName: "Monthly", planType: PlanType.MONTHLY, price: 1500, perks: ["Sauna"] }],
 *   amenities: ["WiFi"],
 *   phoneNumber: "9876543210",
 *   genderSegregation: "UNISEX",
 *   type: "COMMERCIAL",
 *   userId: "user123"
 * });
 */
export const createGymRequest = async (data: GymRequestObjectCreationInput): Promise<GymRequest> => {
  return prisma.gymRequest.create({ data });
}

/**
 * Fetches paginated and sorted gym requests for a given user.
 *
 * @param {string} userId - The ID of the user whose gym requests are being fetched.
 * @param {number} page - The current page number (1-based).
 * @param {number} pageSize - Number of items per page.
 * @param {string} [sortField] - Optional field name to sort by (defaults to 'gymName').
 * @param {"asc" | "desc"} [sortOrder] - Optional sort order, either 'asc' or 'desc' (defaults to 'asc').
 * @returns {Promise<Page<GymRequest>>} A Promise that resolves to a paginated result object containing:
 *  - `data`: Array of `GymRequest` objects for the current page
 *  - `page`: Current page number
 *  - `pageSize`: Number of items per page
 *  - `totalPages`: Total number of pages
 *  - `totalRequests`: Total number of gym requests for the user
 */
export const getGymRequests = async (
  userId: string,
  page: number,
  pageSize: number,
  sortField?: string,
  sortOrder?: "asc" | "desc"
): Promise<Page<GymRequest>> => {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);

  const totalRequests = await prisma.gymRequest.count({
    where: { requestingUser: userId },
  });

  const gymRequests = await prisma.gymRequest.findMany({
    skip: (safePage - 1) * safePageSize,
    take: safePageSize,
    orderBy: { [sortField ?? "gymName"]: sortOrder ?? "asc" },
    where: { requestingUser: userId },
  });

  const totalPages = Math.ceil(totalRequests / safePageSize);

  return {
    data: gymRequests,
    page: safePage,
    pageSize: safePageSize,
    totalPages,
    totalRequests,
  };
};


export const getGymSubmissionDetailsById = async (id: number) => {
  return prisma.gymRequest.findUnique({ where: { id } })
}

export type Page<T = any> = {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalRequests: number;
};

