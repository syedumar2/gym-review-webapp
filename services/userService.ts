/**
 * User Service Module
 * -------------------
 * Handles all business logic related to users.
 * This service uses Prisma ORM for database operations.
 */

import { GymRequest, Prisma, Review, ReviewVote, User, VoteType } from "@/generated/prisma/client";
import { Page, SortParam } from "@/types/api";
import { GymRequestObjectCreationInput } from "@/types/gym";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import { ReviewObjectCreationInput } from "@/types/review";





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
  sort: SortParam[]
): Promise<Page<GymRequest>> => {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);

  // ✅ Whitelist sortable fields
  const validSortFields: (keyof Prisma.GymRequestOrderByWithRelationInput)[] = [
    "gymName",
    "status",
    "createdAt",
  ];

  // ✅ Sanitize sort array
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

  // ✅ Default fallback sort if none valid
  if (safeOrderBy.length === 0) {
    safeOrderBy.push({ createdAt: "desc" });
  }

  const totalRequests = await prisma.gymRequest.count({
    where: { requestingUser: userId },
  });

  const gymRequests = await prisma.gymRequest.findMany({
    skip: (safePage - 1) * safePageSize,
    take: safePageSize,
    where: { requestingUser: userId },
    orderBy: safeOrderBy,
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


export const getGymSubmissionDetailsById = async (id: number) => {
  return prisma.gymRequest.findUnique({ where: { id } })
}


/**
 * Adds a new review to a gym listing
 * @param {ReviewObjectCreationInput} data 
 * @returns {Promise<Review>}
 */
export const addReview = async (data: ReviewObjectCreationInput): Promise<Review> => {
  try {
    return await prisma.$transaction(async (tx) => {
      const existingReview = await tx.review.findFirst({
        where: {
          userId: data.userId,
          gymId: data.gymId,
        },
      });

      if (existingReview) {
        throw new Error("You have already submitted a review for this gym.");
      }

      const newReview = await tx.review.create({
        data: {
          rating: data.rating,
          title: data.title ?? undefined,
          body: data.body,
          userId: data.userId,
          gymId: data.gymId,
        },
      });

      const agg = await tx.review.aggregate({
        where: { gymId: data.gymId },
        _count: { _all: true },
        _sum: { rating: true },
      });

      await tx.gym.update({
        where: { id: data.gymId },
        data: {
          reviewCount: agg._count._all,
          reviewSum: agg._sum.rating ?? 0,
          rating: ((agg._sum.rating ?? 0) / (agg._count._all ?? 1)).toFixed(1),
        }
      },
      )

      return newReview;
    });
  } catch (err: any) {
    if (err.code === "P2003") {
      throw new Error("Invalid user or gym. Please try again.");
    }

    if (err.message.includes("You have already submitted")) {
      throw err;
    }

    throw new Error("Something went wrong while adding your review.");
  }
};

/**
 * Soft Deletes a review on providing userId and reviewId
 * @param userId 
 * @param reviewId 
 * @returns {Promise<Review>}
 */
export const deleteReview = async (
  userId: string,
  reviewId: number
): Promise<Review> => {

  try {
    return await prisma.$transaction(async (tx) => {
      const existingReview = await tx.review.findFirst({
        where: {
          id: reviewId,
          userId,

        },
      });

      if (!existingReview) {
        throw new Error("No such review found!");
      }
      return await tx.review.update({
        where: {
          id: existingReview.id
        },
        data: { isDeleted: true }
      })

    })


  } catch (err: any) {

    if (err.code === "P2003") {
      throw new Error("Invalid user or review. Please try again.");
    }

    if (err.message.includes("No such review found")) {
      throw err;
    }

    throw new Error("Something went wrong while deleting your review.");

  }
}

/**
 * Apply like/dislike to review given the reviewId, userId and vote type
 * Calling this function again with same vote type will result in deletion of the Vote and return null
 * @param reviewId 
 * @param userId 
 * @param type 
 * @returns { Promise<ReviewVote|null>}
 */
export const applyOrRemoveReviewVote = async (
  reviewId: number,
  userId: string,
  type: VoteType
): Promise<ReviewVote | null> => {
  try {
    return await prisma.$transaction(async (tx) => {
      const existingVote = await tx.reviewVote.findFirst({
        where: { reviewId, userId }
      });

      if (!existingVote) {
        return tx.reviewVote.create({
          data: { reviewId, userId, type }
        });
      }

      if (existingVote.type === type) {
        await tx.reviewVote.delete({
          where: { id: existingVote.id }
        });
        return null;
      }

      return tx.reviewVote.update({
        where: { id: existingVote.id },
        data: { type }
      });
    });
  } catch (err: any) {
    console.error(err);
    throw new Error("Something went wrong.", err?.message);
  }
};



