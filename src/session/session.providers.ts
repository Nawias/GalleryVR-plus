import { Connection } from 'typeorm';
import { Session } from './session.entity';

export const sessionProviders = [
  {
    provide: 'SESSION_REPOSITORY',
    useFactory: async (connection: Connection) =>
      await connection.getRepository(Session),
    inject: ['DB_CONNECT'],
  },
];
