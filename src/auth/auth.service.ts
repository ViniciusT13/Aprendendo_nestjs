import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class Authservice {
  async login(loginDto: LoginDto) {
    return loginDto;
  }
}
