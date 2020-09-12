import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

export class GoogleSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user.id);
  }
  async deserializeUser(userId: string, done: Function) {
    return await this.usersService
      .findOneOrFail(userId)
      .then(user => done(null, user))
      .catch(error => done(error));
  }
}
