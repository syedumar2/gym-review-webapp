// prisma/seed.ts
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";

async function main() {
  const password = await bcrypt.hash("password123", 10);
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password,
      role: "admin",
      isVerified: true,
      reviewCount: 0,
      gymRequestsCount: 0,
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
