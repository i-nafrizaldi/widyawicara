// import { hashPassword } from '../../lib/bcrypt';
// import prisma from '../../prisma';
// import { User } from '@prisma/client';

// export const registerService = async (
//   body: Omit<User, 'id' | 'tanggalDaftar'>,
// ) => {
//   try {
//     const { email, nama, password, userName } = body;
//     const existingEmail = await prisma.user.findFirst({
//       where: { email },
//     });

//     if (existingEmail) {
//       throw new Error('Email already exist !');
//     }

//     const existingUserName = await prisma.user.findFirst({
//       where: { userName },
//     });
//     if (existingUserName) {
//       throw new Error('User name already exsit !');
//     }

//     const hashedPassword = await hashPassword(password);

//     const newUser = await prisma.user.create({
//       data: { ...body, password: hashedPassword },
//     });

//     return { message: 'Register success !', data: newUser };
//   } catch (error) {
//     throw error;
//   }
// };
