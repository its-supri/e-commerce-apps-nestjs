import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const mockUserRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: UserService;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      const users = [{ id: 1, username: 'testuser' }];
      userRepository.find.mockResolvedValue(users);
      expect(await service.findAll()).toEqual(users);
    });
  });

  describe('create', () => {
    it('should create and return new user', async () => {
      const dto = {
        username: 'testuser',
        fullname: 'Test User',
        password: 'password123',
        email: 'test@example.com',
        role: 'Buyer',
      };

      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue(dto);
      userRepository.save.mockResolvedValue({ ...dto, id: 1 });

      const result = await service.create(dto);
      expect(result).toMatchObject({
        username: dto.username,
        fullname: dto.fullname,
        email: dto.email,
      });
    });

    it('should throw ConflictException if user exists', async () => {
      userRepository.findOne.mockResolvedValue({ username: 'testuser' });

      await expect(
        service.create({
          username: 'testuser',
          fullname: 'Test User',
          password: 'password123',
          email: 'test@example.com',
          role: 'Buyer',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update and return user', async () => {
      const oldUser = {
        username: 'testuser',
        fullname: 'Old Name',
        password: 'oldpassword',
        email: 'old@example.com',
      };

      const dto = { fullname: 'New Name', password: 'newpassword' };
      userRepository.findOne.mockResolvedValue(oldUser);
      userRepository.save.mockResolvedValue({ ...oldUser, ...dto });

      const result = await service.update('testuser', dto);
      expect(result).toMatchObject({
        username: 'testuser',
        fullname: 'New Name',
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(service.update('missinguser', { fullname: 'New Name', password: 'newpassword' })).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if no data changed', async () => {
      const user = {
        username: 'testuser',
        fullname: 'Same',
        password: 'samepassword',
        email: 'same@example.com',
      };
      userRepository.findOne.mockResolvedValue(user);
      await expect(service.update('testuser', { fullname: 'Same', password: 'samepassword' })).rejects.toThrow(ConflictException);
    });
  });

  describe('delete', () => {
    it('should remove the user', async () => {
      const user = { username: 'testuser' };
      userRepository.findOne.mockResolvedValue(user);
      userRepository.remove.mockResolvedValue(undefined);
      await expect(service.delete('testuser')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if user not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(service.delete('unknown')).rejects.toThrow(NotFoundException);
    });
  });
});
