import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        await this.authService.register(dto);
        return { message: 'User registered' };
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        const { token } = await this.authService.login(dto);
        return { message: 'User logged in', token };
    }
}
