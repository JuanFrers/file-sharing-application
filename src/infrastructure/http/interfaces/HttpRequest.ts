import { FileArray } from 'express-fileupload';

export type HttpRequest<TBody = any, TParams = any, THeaders = any> = {
  body?: TBody;
  params?: TParams;
  query?: TParams;
  headers?: THeaders;
  userId?: string;
  files?: FileArray | null | undefined
};
