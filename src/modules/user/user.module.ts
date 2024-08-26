import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { USER_REPOSITORY } from "./constants/providers";
import { UserRepository } from "./user.repository";


@Module({
    imports: [PrismaModule],
    providers: [
        UserService, {
            provide: USER_REPOSITORY,
            useClass: UserRepository
        }
    ],
    controllers: [
        UserController
    ]

})

export class UserModule {};