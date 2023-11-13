import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
    constructor(private readonly prisma: PrismaService) {}

    async getAccountByEmail(email:string) {
        const account = await this.prisma.account.findFirst({
            where: { email },
            take: 1
        })

        return account
    }

    async createAccount(accountDto: CreateAccountDto) {
        const account = await this.prisma.account.create({
            data: accountDto
        })
        return account
    }
}
