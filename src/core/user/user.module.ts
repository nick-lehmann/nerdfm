import { PrismaModule } from '@db/prisma.module'
import { Module } from '@nestjs/common'
import { AuthModule } from './auth'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, AuthModule],
})
export class UserModule {}
