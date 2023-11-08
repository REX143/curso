import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {

  constructor(
    private eventEmitter: EventEmitter2,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){ }

  async signUp(authRegisterDto: AuthRegisterDto){
    
    const {username, email, password} = authRegisterDto;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userAuth = this.userRepository.create({ username, email, password:hashedPassword });

    const getUser = await this.userRepository.findOne({
      where: {
        email
      }
    });

    if (getUser) {
      throw new ConflictException('Email already exists');
    }   
    
    this.eventEmitter.emit('user.created', userAuth);
    
    return await this.userRepository.save(userAuth);
  }

  async login(authLoginDto: AuthLoginDto){
    const {email, password} = authLoginDto;
    const getUser = await this.userRepository.findOne({
      where: {
        email
      }
    });

    if (!getUser) {
      throw new HttpException('Email no encontrado', HttpStatus.NOT_FOUND)
    }
    const passwordDB = await bcrypt.compareSync(password, getUser.password); // true si coincide
    if (!passwordDB) {
      throw new ConflictException('Error en las credenciales...');
    }

    const payload = {
      id: getUser.id,
      email: getUser.email
    }

    const token = await this.jwtService.sign(payload);
    const data = {
      message: 'acceso autorizado',
      token,
      user: getUser
    }
    return data;
  }

}
