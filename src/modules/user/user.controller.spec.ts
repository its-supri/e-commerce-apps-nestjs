import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  })

  describe('findAll', () => {
    it('shold return an array of users', async () => {
      const result = [{username: 'testuser'}];
      mockUserService.findAll.mockResolvedValue(result);
      
      expect(await controller.findAll()).toBe(result);
    })
  })

  describe('create', () => {
    it('should create and return a user (transformed)', async () => {
      const dto: CreateUserDto = {
        username: 'testuser',
        fullname: 'Test User',
        password: 'password123',
        email: 'test@gmail.com',
        role: 'Buyer',
      };
  
      const mockResult = {
        username: 'testuser',
        fullname: 'Test User',
        email: 'test@gmail.com',
        isActive: true,
        created_at: expect.any(String), // ISO date string
        updated_at: expect.any(String),
      };
  
      mockUserService.create.mockResolvedValue(mockResult);
      const result = await controller.create(dto);
  
      expect(result).toEqual(mockResult);
    });
  });
  

  describe('update', () => {
    it('should update and return a user', async () => {
      const dto: UpdateUserDto = {
        fullname: 'Updated User',
        password: 'newpassword'
      };

      const updated = {username: "testuser", ...dto};
      mockUserService.update.mockResolvedValue(updated);

      expect(await controller.update('testuser', dto)).toEqual(updated);
    })
  })

  describe('delete', () => {
    it('should delete a user', async () => {
      const result = { message: 'User deleted successfully' };
      mockUserService.delete.mockResolvedValue(result);

      expect(await controller.delete('dika')).toEqual(result);
    });
  })
});
