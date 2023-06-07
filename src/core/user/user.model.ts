import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const UserID = z.number()
export type UserID = z.infer<typeof UserID>

export const BaseUserSchema = z.object({
  name: z.string(),
})

export const CreateUserSchema = BaseUserSchema

export class CreateUser extends createZodDto(CreateUserSchema) {}

export const UserSchema = BaseUserSchema.merge(
  z.object({
    id: z.number(),
  }),
)

export class User extends createZodDto(UserSchema) {}
