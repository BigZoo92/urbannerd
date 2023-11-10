import { PrismaClient } from '@prisma/client';
import { AuthSchemaType } from '../../types';

const prisma = new PrismaClient({
  log: ['info', 'warn'],
});

export const searchUserByUsernameOrEmail = async (
  usernameOrEmail: string,
): Promise<AuthSchemaType | null> => {
  try {
    if (usernameOrEmail.includes('@')) {
      const user = await prisma.user.findFirst({
        where: { email: { equals: usernameOrEmail } },
      });
      return user;
    } else {
      const user = await prisma.user.findFirst({
        where: { username: { equals: usernameOrEmail } },
      });
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
