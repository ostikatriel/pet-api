import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { PetEntity } from './pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity]), UsersModule],
  providers: [PetsService],
  controllers: [PetsController],
})
export class PetsModule { }
