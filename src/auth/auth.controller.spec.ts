import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should return user data when valid credentials are provided', async () => {
      const signInDto = { username: 'testuser', password: 'password' };
      const userMock = { id: 1, username: 'testuser' };
      authService.signIn.mockResolvedValue(userMock);

      const result = await authController.signIn(signInDto);

      expect(result).toBe(userMock);
    });
  });

  describe('create', () => {
    it('should return user data when a new user is registered', async () => {
      const createAuthDto: CreateAuthDto = {
        username: 'newuser',
        password: 'password',
        email: 'email',
      };
      const userMock = { id: 2, username: 'newuser' };
      authService.create.mockResolvedValue(userMock);

      const result = await authController.create(createAuthDto);

      expect(result).toBe(userMock);
    });
  });

  describe('getProfile', () => {
    it('should return the user from the request object', () => {
      const userMock = { id: 3, username: 'loggedinuser' };
      const req = { user: userMock };

      const result = authController.getProfile(req);

      expect(result).toBe(userMock);
    });
  });
});
