import { comparePassword, hashPassword } from "../../lib/bcrypt";
import prisma from "../../prisma";
import { User } from "@prisma/client";

interface UpdateUser extends Partial<User> {}

export const updateUserService = async (
  userId: number,
  body: UpdateUser,
  newPassword?: string
) => {
  const { password } = body;

  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isOldPasswordValid = await comparePassword(
      String(password),
      user.password
    );

    if (!isOldPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    const hashedNewPassword = await hashPassword(String(newPassword));

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
      },
    });

    return user;
  } catch (error: any) {
    throw new Error(error.message || "Failed to update user");
  }
};
