import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

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
}
