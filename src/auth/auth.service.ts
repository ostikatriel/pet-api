import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async register(dto: RegisterDto): Promise<Omit<UserEntity, 'password'>> {
        const existingUser = await this.usersService.findByEmail(dto.email);
        if (existingUser) throw new ConflictException('El correo electrónico ya está en uso.');
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.usersService.create({
            email: dto.email,
            fullName: dto.fullName,
            password: hashed,
        });
        const { password, ...result } = user;
        return result;
    }

    async login(dto: LoginDto): Promise<{ token: string }> {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id, role: user.role };
        const token = this.jwtService.sign(payload);
        return { token };
    }
}
