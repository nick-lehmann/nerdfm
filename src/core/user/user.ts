import { FactoryProvider } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { User, UserID } from './user.model'
import { UserService } from './user.service'

export const USER_ID_TOKEN = Symbol('user_id')
export const USER_PAYLOAD_TOKEN = Symbol('user_payload')
export const USER_TOKEN = Symbol('user')

export const UserIDProvider: FactoryProvider<UserID> = {
  provide: USER_ID_TOKEN,
  useFactory: (req) => req.user.id,
  inject: [REQUEST],
}

export const UserPayloadProvider: FactoryProvider<User> = {
  provide: USER_PAYLOAD_TOKEN,
  useFactory: (req) => req.user,
  inject: [REQUEST],
}

export const UserProvider: FactoryProvider<User> = {
  provide: USER_TOKEN,
  useFactory: async (req, userService) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return userService.get(req.user.id)!
  },
  inject: [REQUEST, UserService],
}
