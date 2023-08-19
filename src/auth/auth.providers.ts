import { Connection } from 'mongoose';
import { AuthSchema } from './schemas/auth.schema';

export const authsProviders = [
  {
    provide: 'AUTH_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Auth', AuthSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
