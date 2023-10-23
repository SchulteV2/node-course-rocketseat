import { Prisma } from '@prisma/client'

export class InMemoryUsersReporistory {
  public users: any[] = []
  async create(data: Prisma.UserCreateInput) {
    this.users.push(data)
  }
}
