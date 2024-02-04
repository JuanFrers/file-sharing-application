import { PutObjectCommand } from '@aws-sdk/client-s3';
import { UploadFileRepositoryInterface, UploadFileRepositoryRequest, UploadFileRepositoryResponse } from '../../../../domain/repositories/file-management/UploadFileRepositoryInterface';
import { getS3Client } from '../../../aws/s3/helpers/S3Client';
import env from '../../../../main/config/env';

export class UploadFileRepository implements
  UploadFileRepositoryInterface {
  async uploadFile(
    fileData: UploadFileRepositoryRequest,
  ): Promise<UploadFileRepositoryResponse> {
    const { payload, path } = fileData;
    const client = getS3Client();

    const command = new PutObjectCommand({
      Bucket: env.aws.bucket,
      Key: path,
      Body: payload,
      ContentType: fileData.mimeType,
    });

    await client.send(command);
  }
}
