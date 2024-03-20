import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private prisma: PrismaService
  ) { }

  @Post('create')
  async signupUser(
    @Body() userData: { name?: string; email: string, password: string, roleId: number },
  ) {
    // Generar un hash seguro de la contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const role  = await this.prisma.role.findUnique({ where: { id: 1 } });
   
    // Crear un nuevo objeto de usuario con la contraseña encriptada
    var newUser = {
      ...userData,
      password: hashedPassword
    };
    return this.userService.createUser(newUser);
  }

  @Get('/')
  findAll() {
    return [];
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
