import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

const mockAuthModel = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'AUTH_MODEL',
          useValue: mockAuthModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('create', () => {
    it('should create a new user and return it', async () => {
      const createAuthDto: CreateAuthDto = {
        username: 'newuser',
        password: 'password',
        email: 'email@example.com',
      };

      const hash = 'hashedPassword';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hash);

      const savedUser = { ...createAuthDto, password: hash };
      mockAuthModel.findOne.mockResolvedValue(null);
      mockAuthModel.create.mockResolvedValue(savedUser);

      const result = await authService.create(createAuthDto);

      expect(result).toEqual(savedUser);
    });

    it('should throw a ConflictException if email already exists', async () => {
      const createAuthDto: CreateAuthDto = {
        username: 'existinguser',
        password: 'password',
        email: 'existing@example.com',
      };

      mockAuthModel.findOne.mockResolvedValue({ email: createAuthDto.email });

      await expect(authService.create(createAuthDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('signIn', () => {
    it('should sign in a user and return an access token', async () => {
      const username = 'testuser';
      const password = 'password';
      const hashedPassword = 'hashedPassword';

      const user = {
        _id: 'userId',
        username: 'testuser',
        password: hashedPassword,
      };

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockAuthModel.findOne.mockResolvedValue(user);

      const accessToken = 'generatedAccessToken';
      mockJwtService.signAsync.mockResolvedValue(accessToken);

      const result = await authService.signIn(username, password);

      expect(result).toEqual({ access_token: accessToken });
    });

    it('should throw an UnauthorizedException if password is incorrect', async () => {
      const username = 'testuser';
      const password = 'incorrectPassword';

      const user = {
        _id: 'userId',
        username: 'testuser',
        password: 'hashedPassword',
      };

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      mockAuthModel.findOne.mockResolvedValue(user);

      await expect(authService.signIn(username, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
