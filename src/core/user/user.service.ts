import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateUser, User, UserID } from './user.model'

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name)

  constructor(private readonly db: PrismaService) {}

  async create(user: CreateUser): Promise<User> {
    this.logger.log(`Create user ${user.name}`)
    return this.db.user.create({
      data: {
        // FIXME
        name: user.name,
      },
    })
  }

  async list(): Promise<User[]> {
    return this.db.user.findMany()
  }

  async get(id: UserID): Promise<User | null> {
    return this.db.user.findFirst({ where: { id } })
  }

  async getByName(name: string): Promise<User | null> {
    return this.db.user.findFirst({ where: { name } })
  }
}
