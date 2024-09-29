import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserRepository } from "./interfaces/repository.interface";
import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { User } from "../../domain/user.domain";

@Injectable()
export class UserRepositoryImpl implements UserRepository{

  constructor(
    @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>
  ){}

  public async createUser(user: User): Promise<User> {
    const user_record = this.repository.create(user);
    return this.repository.save(user_record);
  }

  public async isUserExist(email: string): Promise<boolean> {
    return this.repository.exists({
      where: { email }
    })
  }

}