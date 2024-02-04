import { Connection } from 'mysql2/promise';
import { HttpRequest } from '../interfaces/HttpRequest';
import { HttpResponse } from '../interfaces/HttpResponse';
import { Validation } from '../interfaces/Validation';
import { badRequest, serverError } from '../helpers/http';
import { createConnection } from '../../mysql/helpers/DbConnection';

export abstract class BaseController {
  constructor(private readonly validation?: Validation) {}

  abstract execute(httpRequest: HttpRequest, connection:Connection): Promise<HttpResponse>;

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation?.validate(httpRequest);
    if (error) {
      return badRequest(error);
    }
    const connection = await createConnection();
    try {
      await connection.connect();
      await connection.beginTransaction();
      const res = await this.execute(httpRequest, connection);
      await connection.commit();
      return res;
    } catch (err) {
      console.error(err);
      await connection.rollback();
      return serverError(err);
    } finally {
      await connection.end();
    }
  }
}
