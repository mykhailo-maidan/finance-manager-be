import { User } from "@prisma/client";
import { UserDTO } from "../dto/create-user.dto";

export interface IUserRepository{
    createUser(user: UserDTO);
}