import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    
    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(createUserDto: CreateUserDto): Promise<any> {
        const {username, fullname, password, email, role} = createUserDto;

        const userExists = await this.userRepository.findOne({ where: { username } });
        if (userExists) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            username,
            fullname,
            password: hashedPassword,
            email,
            role
        });

        const savedUser = await this.userRepository.save(newUser);

        return plainToInstance(User, savedUser, {
            excludeExtraneousValues: true, // optional if you're only using @Exclude
        });
    }

    async update(username: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.userRepository.findOne({ where: { username } });
      
        if (!user) {
          throw new NotFoundException('User not found');
        }
      
        const hasChanges = Object.entries(updateUserDto).some(([key, value]) => {
          return value !== undefined && value !== user[key];
        });
      
        if (!hasChanges) {
          throw new ConflictException('No changes to update');
        }
      
        if (updateUserDto.password) {
          updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
      
        const updatedUser = await this.userRepository.save({
          ...user,
          ...updateUserDto,
        });
      
        return plainToInstance(UserResponseDto, updatedUser, {
          excludeExtraneousValues: true,
        });
      }

    async delete(username: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.userRepository.remove(user);
    }
}
