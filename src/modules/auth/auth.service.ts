import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtUser } from 'src/common/class/jwt-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}
  
    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);
      if (user && (await bcrypt.compare(pass, user.password))) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.validateUser(username, pass);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtUser = {
            id: user.id,
            username: user.username,
            name: user.fullname,
            email: user.email,
            role: user.role,
        };

        const expiresIn = process.env.JWT_EXPIRATION_TIME || '1h';

        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn
        });
        const decoded = this.jwtService.decode(token);
        const expired = decoded?.exp;

        return {
            access_token: token,
            expiresIn: expired
        }
    }
  }
