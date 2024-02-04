import { NextFunction, Request, Response } from 'express';
import { BaseMiddleware } from '../../infrastructure/http/middlewares/BaseMiddleware';
import { HttpRequest } from '../../infrastructure/http/interfaces/HttpRequest';

export const expressMiddlewareAdapter = (
  middleware: BaseMiddleware,
) => async (req: Request, res: Response, next: NextFunction) => {
  const httpRequest: HttpRequest = {
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
    userId: req.headers.userId as string | undefined,
  };
  const httpResponse = await middleware.handle(httpRequest);
  if (httpResponse.statusCode === 200) {
    Object.assign(req.headers, httpResponse.body);
    next();
  } else {
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body?.message,
    });
  }
};
