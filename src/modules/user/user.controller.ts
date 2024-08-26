import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "./dto/create-user.dto";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post()
    create(@Body() createUserDto: UserDTO) {
    console.log("User: ", createUserDto)
      return this.userService.create(createUserDto);
    }
}