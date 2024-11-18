import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { faker } from '@faker-js/faker';
import { AppDataSource } from '../data-source';

async function bootstrap() {
    // Initialize the database connection
    const dataSource = await AppDataSource.initialize();

    const userRepository = dataSource.getRepository(User);

    const batchSize = 10000;
    const totalUsers = 1000000;
    let users = [];

    for (let i = 0; i < totalUsers; i++) {
        const user = userRepository.create({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            age: faker.number.int({ min: 18, max: 80 }),
            gender: faker.person.sexType(),
            issues: faker.datatype.boolean(),
        });
        users.push(user);

        if (users.length >= batchSize) {
            await userRepository.save(users);
            users = [];
            console.log(`Inserted ${i + 1} users`);
        }
    }

    if (users.length > 0) {
        await userRepository.save(users);
        console.log(`Inserted remaining ${users.length} users`);
    }

    // Close the database connection
    await dataSource.destroy();
}

bootstrap().catch((error) => {
    console.error('Error during seeding:', error);
});
