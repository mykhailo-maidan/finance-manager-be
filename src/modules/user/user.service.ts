import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "./interfaces/interfaces";
import { UserDTO } from "./dto/create-user.dto";
import { USER_REPOSITORY } from "./constants/providers";

@Injectable()
export class UserService{
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository){}

    async create(createUserDto: UserDTO){
         this.userRepository.createUser(createUserDto)
    }

}