import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('pets')
export class PetEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    species: string;

    // @ManyToOne(() => UserEntity, (user) => user.pets, { eager: true })
    @ManyToOne(() => UserEntity, (user) => user.pets)
    @JoinColumn({ name: 'owner_id' })
    owner: UserEntity;
}
