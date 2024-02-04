import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { RemoveFileRepositoryInterface, RemoveFileRepositoryRequest, RemoveFileRepositoryResponse } from '../../../../domain/repositories/file-management/RemoveFileRepositoryInterface';
import env from '../../../../main/config/env';
import { getS3Client } from '../../../aws/s3/helpers/S3Client';

export class RemoveFileRepository implements
  RemoveFileRepositoryInterface {
  async removeFile(
    fileData: RemoveFileRepositoryRequest,
  ): Promise<RemoveFileRepositoryResponse> {
    const { path } = fileData;

    const client = getS3Client();

    const command = new DeleteObjectCommand({
      Bucket: env.aws.bucket,
      Key: path,
    });

    await client.send(command);
  }
}
