import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async registerUser(user: UserDto) {
    const existingUser = await this.userRepo.findOneBy({
      username: user.username,
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    return this.userRepo.save({ ...user, role: 0 });
  }

  async findUserByUsername(username: string) {
    return this.userRepo.findOneBy({ username });
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepo.findOneBy({ username });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
