/**
 * Admin Service Module
 * -------------------
 * Handles all business logic related to admin actions.
 * This service uses Prisma ORM for database operations.
 */

import { Gym, GymRequest, Prisma, User } from "@/generated/prisma/client";
import prisma from "../lib/prisma";
import { Page, SortParam } from "@/types/api";
import { json } from "zod";
import { InputJsonValue } from "@prisma/client/runtime/library";

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
  return {
    data: gymRequests,
    page: safePage,
    pageSize: safePageSize,
    totalPages,
    totalElements: totalRequests,
  };
};


/**
 * Rejects a gym request and removes any existing matching gym record.
 *
 * @param {GymRequest} gymData - The gym request to reject.
 * @param {string} adminId - ID of the admin rejecting the request.
 * @param {string} reason - Reason for rejection.
 * @returns {Promise<GymRequest>} The updated rejected gym request.
 * @throws {Error} If the request is already rejected.
 */
export const rejectGym = async (
  gymData: GymRequest,
  adminId: string,
  reason: string
): Promise<GymRequest> => {
  return await prisma.$transaction(async (tx) => {
    const existingRequest = await tx.gymRequest.findFirst({
      where: { id: gymData.id },
    });

    if (!existingRequest) {
      throw new Error("Gym request not found.");
    }

    if (existingRequest.status === "REJECTED") {
      throw new Error("Gym request already rejected.");
    }

    const existingGym = await tx.gym.findFirst({
      where: {
        gymName: gymData.gymName,
        address: { equals: gymData.address as InputJsonValue },
      },
    });

    if (existingGym && existingRequest.status !== "APPROVED") {
      await tx.gym.delete({
        where: { id: existingGym.id },
      });
    }

    // Update the request status to REJECTED
    const updatedGymRequest = await tx.gymRequest.update({
      where: { id: gymData.id },
      data: {
        status: "REJECTED",
        reason,
        rejectedAt: new Date(),
        rejectedByAdminId: adminId,
      },
    });

    return updatedGymRequest;
  });
};







/**
 * Approves a GymRequest by creating a corresponding Gym entry and updating the request status.
 *
 * @param {GymRequest} gymData - The gym request data to approve.
 * @param {string} adminId - The ID of the admin approving the gym.
 * @returns {Promise<Gym>} The newly created Gym.
 * @throws {Error} If the gym request is not found, already approved, or if a gym with the same name and address exists.
 */
export const approveGym = async (
  gymData: GymRequest,
  adminId: string,
): Promise<Gym> => {
  const existingRequest = await prisma.gymRequest.findFirst({
    where: { id: gymData.id },
  });

  if (!existingRequest) {
    throw new Error("Gym Request not found!");
  }

  if (existingRequest.status === "APPROVED") {
    throw new Error("Gym Request is already approved!");
  }

  const existingGym = await prisma.gym.findFirst({
    where: {
      gymName: gymData.gymName,
      address: { equals: gymData.address as InputJsonValue },
    },
  });

  if (existingGym) {
    throw new Error("Gym with this name and address already exists!");
  }

  const newGym = await prisma.$transaction(async (tx) => {
    const gym = await tx.gym.create({
      data: {
        gymName: gymData.gymName,
        description: gymData.description,
        address: gymData.address as InputJsonValue,
        city: gymData.city,
        state: gymData.state,
        pincode: gymData.pincode,
        gymType: gymData.gymType,
        genderSegregation: gymData.genderSegregation,
        phoneNumber: gymData.phoneNumber,
        timings: gymData.timings as InputJsonValue,
        amenities: gymData.amenities,
        membershipPlans: gymData.membershipPlans as InputJsonValue,
        cardioEquipment: gymData.cardioEquipment,
        strengthEquipment: gymData.strengthEquipment,
        functionalEquipment: gymData.functionalEquipment,
        miscEquipment: gymData.miscEquipment,
        images: gymData.images as InputJsonValue,
        approvedByAdminId: adminId,
      },
    });

    await tx.gymRequest.update({
      where: { id: gymData.id },
      data: {
        status: "APPROVED",
        approvedAt: new Date(),
        approvedByAdminId: adminId,
        updatedAt: new Date()
      },
    });

    return gym;
  });

  return newGym;
};


