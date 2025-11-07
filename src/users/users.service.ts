import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) { }

    create(user: Partial<UserEntity>) {
        const u = this.repo.create(user);
        return this.repo.save(u);
    }

    findByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }

    findById(id: number) {
        return this.repo.findOne({ where: { id } });
    }
}
