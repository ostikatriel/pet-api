import { Controller, Get, Post, Body, UseGuards, Request, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PetsService } from './pets.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth/jwt-auth.guard';

import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
@UseGuards(JwtAuthGuard)
export class PetsController {
    constructor(private petsService: PetsService) { }

    @Post()
    async create(@Body() dto: CreatePetDto, @Request() req) {
        const pet = await this.petsService.create(dto, req.user);
        const { owner, ...petWithoutOwner } = pet;
        return { message: 'Pet created', data: petWithoutOwner };
    }

    @Get()
    async findAll(@Request() req) {
        const pets = await this.petsService.findAll(req.user);
        return { message: 'Pets found', data: pets };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePetDto, @Request() req) {
        const pet = await this.petsService.update(id, dto, req.user);
        const { owner, ...petWithoutOwner } = pet;
        return { message: 'Pet updated', data: petWithoutOwner };
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const pet = await this.petsService.remove(id, req.user);
        const { owner, ...petWithoutOwner } = pet;
        return { message: 'Pet deleted', data: petWithoutOwner };
    }
}
