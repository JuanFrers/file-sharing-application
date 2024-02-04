import { AuthenticateInterface, AuthenticateInterfaceRequest, AuthenticateInterfaceResponse } from '../../interfaces/use-cases/authentication/AuthenticateInterface';
import { JWTVerifier } from '../../interfaces/cryptography/JWTVerifier';
import { ForbiddenError } from '../../errors/ForbiddenError';

export class Authenticate implements AuthenticateInterface {
  constructor(
    private readonly jwtVerifier: JWTVerifier,
  ) {}

  async execute(
    authenticationToken: AuthenticateInterfaceRequest,
  ): Promise<AuthenticateInterfaceResponse> {
    const decodedToken = await this.jwtVerifier.verify(authenticationToken);
    if (!decodedToken) {
      return new ForbiddenError();
    }
    return decodedToken;
  }
}
