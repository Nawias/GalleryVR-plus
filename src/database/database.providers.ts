import { async } from 'rxjs';
import { createConnection } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Session } from 'src/session/session.entity';

export const databaseProviders = [
  {
    provide: 'DB_CONNECT',
    useFactory: async () =>
      await createConnection({
        type: 'sqlite',
        database: './database.sqlite',
        entities: [User, Session],
        synchronize: true,
      }),
  },
];
