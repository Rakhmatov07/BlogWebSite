import { v4 as uuid } from 'uuid';
import * as argon from "argon2";
import * as fs from "fs/promises";
import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor( private readonly jwtService: JwtService ){}

  async register(registerDto: RegisterDto) {
    const users = await this.findUsers();
    const user = users.find((u: { email: string }) => u.email === registerDto.email);

    if(user) throw new Error('User already registered!');
    const hash = await argon.hash(registerDto.password);

    const newUser = {
      id: uuid(),
      firstname: registerDto.firstname,
      lastname: registerDto.lastname,
      email: registerDto.email,
      password: hash,
      createdAt: new Date(),
    };

    const token = this.jwtService.sign({ id: newUser.id });
    const data = users.length ? [ ...users, newUser ] : [ newUser ];

    await fs.writeFile('./database/users.json', JSON.stringify(data, null, 2), "utf-8");
    return { message: 'Success', token };
  }

  async login(loginDto: LoginDto) {
    const users = await this.findUsers();
    const user = users.find((u: { email: string }) => u.email === loginDto.email);

    if(!user) throw new Error('User Not Found!');
    const checkPass = await argon.verify(user.password, loginDto.password);

    if(!checkPass) throw new Error('Wrong Password');

    const token = this.jwtService.sign({ id: user.id });
    return { message: 'Success', token };
  }

  private async findUsers(){
    const users = await fs.readFile('./database/users.json', 'utf-8');
    return users ? JSON.parse(users) : [];
  }
}
