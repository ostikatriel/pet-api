import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PetEntity } from '../pets/pet.entity';

export enum Role {
    ADMIN = 'ADMIN',
    CLIENT = 'CLIENT',
}

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column({ type: 'enum', enum: Role, default: Role.CLIENT })
    role: Role;

    @OneToMany(() => PetEntity, (pet) => pet.owner)
    pets: PetEntity[];
}
