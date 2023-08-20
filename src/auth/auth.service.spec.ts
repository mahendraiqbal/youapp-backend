import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { Auth } from './interfaces/auth.interface';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let authModelMock: Partial<Record<keyof Model<Auth>, jest.Mock>>;
  let jwtServiceMock: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    authModelMock = {
      findOne: jest.fn(),
      create: jest.fn(),
    };

    jwtServiceMock = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('Auth'),
          useValue: authModelMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  // Add more test cases for the AuthService methods
});
