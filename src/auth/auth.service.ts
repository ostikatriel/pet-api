import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async register(dto: RegisterDto) {
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.usersService.create({
            email: dto.email,
            fullName: dto.fullName,
            password: hashed,
        });
        return { message: 'User registered', user: { id: user.id, email: user.email } };
    }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id, role: user.role };
        const token = this.jwtService.sign(payload);
        return { token };
    }
}

