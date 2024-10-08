import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './interfaces/repository.interface';
import { USER_REPOSITORY } from '../../common/providers';
import { User } from '../../domain/user.domain';

@Injectable()
export class UsersService {

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User(createUserDto.name, createUserDto.email);
      await this.userRepository.createUser(user);
    } catch(error){
      if (error.code === '23505'){
        throw new BadRequestException('User already exists;')
      }
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByEmail(email: string): Promise<User|undefined> {
    try{
      const user = await this.userRepository.findByEmail(email);
      return user !== null ? user : undefined;
    }catch(error){
      return undefined;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
