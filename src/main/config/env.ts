import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5050,
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'file_sharing_application_bd',
  },
  aws: {
    bucket: process.env.BUCKET_NAME || 'main-bucket',
    region: process.env.AWS_DEFAULT_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
    endpoint: {
      endpoint: process.env.AWS_ENDPOINT_URL,
    },
  },
  bcryptSalt: 12,
  jwtSecret: process.env.JWT_SECRET || 'secret',
};
