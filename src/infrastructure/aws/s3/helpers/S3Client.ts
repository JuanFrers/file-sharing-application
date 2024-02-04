import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import env from '../../../../main/config/env';

const config: S3ClientConfig = {
  region: env.aws.region,
  credentials: {
    accessKeyId: env.aws.accessKeyId,
    secretAccessKey: env.aws.secretAccessKey,
  },
  endpoint: env.aws.endpoint.endpoint,
  forcePathStyle: true,
};

export function getS3Client(): S3Client {
  return new S3Client(config);
}
