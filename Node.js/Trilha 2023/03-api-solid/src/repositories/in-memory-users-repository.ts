import { Prisma } from '@prisma/client'

export class InMemoryUsersRepository {
  public user: any[] = []
  async create(data: Prisma.UserCreateInput) {
    this.user.push(data)
  }
}
