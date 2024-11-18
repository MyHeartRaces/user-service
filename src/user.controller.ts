import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('reset-issues')
    async resetIssues() {
        const count = await this.userService.resetIssuesFlagAndCount();
        return { message: `Issues flag reset for all users`, count };
    }
}
