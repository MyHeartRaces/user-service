import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async resetIssuesFlagAndCount(): Promise<number> {
        const count = await this.usersRepository.count({ where: { issues: true } });

        await this.usersRepository
            .createQueryBuilder()
            .update(User)
            .set({ issues: false })
            .execute();

        return count;
    }
}
