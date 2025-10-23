/**
 * Admin Service Module
 * -------------------
 * Handles all business logic related to admin actions.
 * This service uses Prisma ORM for database operations.
 */

import { GymRequest, Prisma, User } from "@/generated/prisma/client";
import prisma from "../lib/prisma";
import { Page, SortParam } from "@/types/api";

export const getAllUsers = async (
  page: number,
  pageSize: number,
  sort: SortParam[]
): Promise<Page<User>> => {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);

  const validSortFields: (keyof Prisma.UserOrderByWithRelationInput)[] = [
    "name",
    "email",
    "role",
    "createdAt",
    "updatedAt",
    "lastLogin",
  ];

  const safeOrderBy = sort.filter((s) => s.field && validSortFields.includes(s.field as any) &&
    (s.order === "asc" || s.order === "desc")).map((s) => ({
      [s.field]: s.order
    }))

  if (safeOrderBy.length === 0) {
    safeOrderBy.push({ createdAt: "desc" });
  }

  const totalUsers = await prisma.user.count();

  const users = await prisma.user.findMany({
    skip: (safePage - 1) * safePageSize,
    take: safePageSize,
    orderBy: safeOrderBy
  })

  const totalPages = Math.ceil(totalUsers / safePageSize);

  return {
    data: users,
    page: safePage,
    pageSize: safePageSize,
    totalPages,
    totalElements: totalUsers,
  };
};




/**
 * Fetches paginated and sorted gym requests for Admin to approve or reject.
 *
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
export const getAllGymRequests = async (

  page: number,
  pageSize: number,
  sort: SortParam[]
): Promise<Page<GymRequest>> => {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);

  const validSortFields: (keyof Prisma.GymRequestOrderByWithRelationInput)[] = [
    "gymName",
    "requestingUser",
    "phoneNumber",
    "status",
    "createdAt",
  ];

  const safeOrderBy = sort
    .filter(
      (s) =>
        s.field &&
        validSortFields.includes(s.field as any) &&
        (s.order === "asc" || s.order === "desc")
    )
    .map((s) => ({
      [s.field]: s.order,
    }));

  if (safeOrderBy.length === 0) {
    safeOrderBy.push({ createdAt: "desc" });
  }

  const totalRequests = await prisma.gymRequest.count();

  const gymRequests = await prisma.gymRequest.findMany({
    skip: (safePage - 1) * safePageSize,
    take: safePageSize,
    orderBy: safeOrderBy,
    include: {
      user: {
        select: {
          name: true
        }
      }
    }
  });

  const totalPages = Math.ceil(totalRequests / safePageSize);
  console.log("Gym Requests meant for admin",gymRequests)
  return {
    data: gymRequests,
    page: safePage,
    pageSize: safePageSize,
    totalPages,
    totalElements: totalRequests,
  };
};


