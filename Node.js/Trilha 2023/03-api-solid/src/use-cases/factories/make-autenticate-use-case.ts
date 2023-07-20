import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUserCase } from '../autenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUserCase(usersRepository)

  return authenticateUseCase
}
