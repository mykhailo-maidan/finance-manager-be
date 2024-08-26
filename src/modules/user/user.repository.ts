import { User } from "@prisma/client";
import { UserDTO } from "./dto/create-user.dto";
import { IUserRepository } from "./interfaces/interfaces";
import { PrismaService } from "src/common/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository implements IUserRepository{
    constructor(private readonly prisma: PrismaService){}

   async createUser(createUserDto: UserDTO) {
        
        await this.prisma.user.create( { data: createUserDto })
        console.log("User has been createed")
        console.log("USER DATA: $s", createUserDto)
    }

}