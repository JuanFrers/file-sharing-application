export type HttpResponse<TBody = any, THeaders = any> = {
  statusCode: number;
  body?: TBody;
  headers?: THeaders;
};
