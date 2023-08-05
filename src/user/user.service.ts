import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async crateUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const passwordHashed = await hash(createUserDto.password, 10);

    return this.userRepository.save({
      ...createUserDto,
      password: passwordHashed,
    });
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
