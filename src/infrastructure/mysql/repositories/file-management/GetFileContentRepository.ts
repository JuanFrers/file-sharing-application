import { Readable } from 'stream';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import env from '../../../../main/config/env';
import { GetFileContentRepositoryInterface, GetFileContentRepositoryRequest, GetFileContentRepositoryResponse } from '../../../../domain/repositories/file-management/GetFileContentRepositoryInterface';
import { getS3Client } from '../../../aws/s3/helpers/S3Client';

export class GetFileContentRepository implements
  GetFileContentRepositoryInterface {
  async getFileContent(
    fileData: GetFileContentRepositoryRequest,
  ): Promise<GetFileContentRepositoryResponse> {
    const { path } = fileData;

    const client = getS3Client();

    const command = new GetObjectCommand({
      Bucket: env.aws.bucket,
      Key: path,
    });

    const res = await client.send(command);

    if (res.Body) {
      return {
        stream: res.Body as Readable,
        mimeType: res.ContentType || 'application/octet-stream',
      };
    }
    return undefined;
  }
}
