import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new CreateGymUseCase(usersRepository)

  return registerUseCase
}
