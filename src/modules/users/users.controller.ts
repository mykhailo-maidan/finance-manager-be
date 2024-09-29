import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

@Controller('casdoor')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/users')
  async createUser(@Req() req: Request){
    let user  = req.body.extendedUser;
    const {name, email} = user;
    return this.usersService.create({
      name: name,
      email: email
    }); 
  }
}
