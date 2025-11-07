import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetEntity } from './pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { UserEntity, Role } from '../users/user.entity';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(PetEntity) private repo: Repository<PetEntity>) { }

    create(dto: CreatePetDto, owner: UserEntity) {
        const pet = this.repo.create({ ...dto, owner });
        return this.repo.save(pet);
    }

    findAll(user: UserEntity) {
        if (user.role === Role.ADMIN) return this.repo.find();
        return this.repo.find({ where: { owner: { id: user.id } } });
    }

    async update(id: number, dto: UpdatePetDto, user: UserEntity) {
        const pet = await this.repo.findOne({ where: { id }, relations: ['owner'] });
        if (!pet) throw new NotFoundException('Pet not found');

        if (user.role !== Role.ADMIN && pet.owner.id !== user.id)
            throw new ForbiddenException('You cannot edit this pet');

        Object.assign(pet, dto);
        return this.repo.save(pet);
    }

    async remove(id: number, user: UserEntity) {
        const pet = await this.repo.findOne({ where: { id }, relations: ['owner'] });
        if (!pet) throw new NotFoundException('Pet not found');

        if (user.role !== Role.ADMIN && pet.owner.id !== user.id)
            throw new ForbiddenException('You cannot delete this pet');

        return this.repo.remove(pet);
    }
}
