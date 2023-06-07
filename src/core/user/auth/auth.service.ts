import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './auth.payload'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: JwtPayload) {
    return this.jwtService.sign(user)
  }
}
