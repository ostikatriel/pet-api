import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UsersModule, AuthModule, PetsModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
