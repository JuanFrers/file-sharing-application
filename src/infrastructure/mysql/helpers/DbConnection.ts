import mysql, { ConnectionOptions, Connection } from 'mysql2/promise';
import env from '../../../main/config/env';

const access: ConnectionOptions = {
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
};

export async function createConnection(): Promise<Connection> {
  return mysql.createConnection(access);
}
