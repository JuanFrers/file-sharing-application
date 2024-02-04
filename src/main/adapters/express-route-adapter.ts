import { Request, Response } from 'express';
import { BaseController } from '../../infrastructure/http/controllers/BaseController';
import { HttpRequest } from '../../infrastructure/http/interfaces/HttpRequest';

export const expressRouteAdapter = (
  controller: BaseController,
) => async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
    userId: req.headers.userId as string | undefined,
    files: req.files || {},
  };

  const httpResponse = await controller.handle(httpRequest);
  if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  } else {
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body?.message,
    });
  }
};
