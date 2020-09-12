import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }
  findOneByGoogleId(googleId: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        googleId: googleId,
      },
    });
  }

  findOneOrFail(id: string): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findOrCreate(profile: any): Promise<User> {
    let object = await this.findOneByGoogleId(profile.id);
    if (!object) {
      console.log('new user');
      object = await this.userRepository.save(
        new User(
          profile.id,
          profile.name.givenName,
          profile.name.familyName,
          profile.emails[0].value,
        ),
      );
    }
    return object;
  }
}
