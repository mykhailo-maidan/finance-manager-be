import { User } from "../../../domain/user.domain";


export interface UserRepository { 
  createUser(user: User): Promise<User>;

  isUserExist(email: string): Promise<boolean>;
}