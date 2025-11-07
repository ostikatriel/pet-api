import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity, Role } from './users/user.entity';
import { PetEntity } from './pets/pet.entity';

const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [UserEntity, PetEntity],
    synchronize: true,
});

async function seed() {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(UserEntity);
    const existing = await repo.findOne({ where: { email: 'admin@test.com' } });
    if (existing) {
        console.log('Admin already exists');
        return;
    }
    const hashed = await bcrypt.hash('admin123', 10);
    const admin = repo.create({
        email: 'admin@test.com',
        fullName: 'Admin',
        password: hashed,
        role: Role.ADMIN,
    });
    await repo.save(admin);
    console.log('Admin created: admin@test.com / admin123');
    await AppDataSource.destroy();
}

seed().catch((e) => {
    console.error(e);
    process.exit(1);
});
