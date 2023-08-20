import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { Auth } from './interfaces/auth.interface';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MODEL')
    private authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    const saltOrRounds = 10;
    const password = createAuthDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createAuthDto.password = hash;

    const existingAuth = await this.authModel
      .findOne({ email: createAuthDto.email })
      .exec();
    if (existingAuth) {
      throw new ConflictException('Email already exists');
    }

    const createdAuth = new this.authModel(createAuthDto);
    return createdAuth.save();
  }

  async findAll(): Promise<Auth[]> {
    return this.authModel.find().exec();
  }

  async signIn(username, pass) {
    const user = await this.authModel.findOne({
      username: username,
    });
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
