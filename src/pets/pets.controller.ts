import { Controller, Get, Post, Body, UseGuards, Request, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PetsService } from './pets.service';
// import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';

import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
@UseGuards(JwtAuthGuard)
export class PetsController {
    constructor(private petsService: PetsService) { }

    @Post()
    create(@Body() dto: CreatePetDto, @Request() req) {
        return this.petsService.create(dto, req.user);
    }

    @Get()
    findAll(@Request() req) {
        return this.petsService.findAll(req.user);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePetDto, @Request() req) {
        return this.petsService.update(id, dto, req.user);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.petsService.remove(id, req.user);
    }
}
