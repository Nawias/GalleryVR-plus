import { Connection } from 'typeorm';
import { User } from './user.entity';

export const userProviders = [
  {
    inject: ['DB_CONNECT'],
    provide: 'USER_REPOSITORY',
    useFactory: async (connection: Connection) =>
      await connection.getRepository(User),
  },
];
