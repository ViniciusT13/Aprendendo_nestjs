import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthController } from './auth.controller';
import { Authservice } from './auth.service';

@Global()
@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BcryptService,
    },
    Authservice,
  ],
  exports: [HashingServiceProtocol],
})
export class AuthModule {}
