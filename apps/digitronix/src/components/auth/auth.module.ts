import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt"

@Module({
  imports: [JwtModule.register(
    {
      secret: String(process.env.TOKEN_SECRET),
      signOptions: { expiresIn: "30d" }
    }
  )],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
