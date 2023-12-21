import { PrismaClient } from '@prisma/client';
import { AuthSchemaType } from '../../types';

const prisma = new PrismaClient();

export const searchUserByUsernameOrEmail = async (
  usernameOrEmail: string,
): Promise<AuthSchemaType | null> => {
  try {
    if (usernameOrEmail.includes('@')) {
      const user = await prisma.user.findFirst({
        where: { email: { equals: usernameOrEmail } },
      });
      //@ts-ignore
      return user;
    } else {
      const user = await prisma.user.findFirst({
        where: { username: { equals: usernameOrEmail } },
      });
      //@ts-ignore
      return user;
    }
  } catch (error) {
    console.error(
      "Erreur lors de la recherche d'utilisateur existant :",
      error,
    );
    throw error;
  }
};
