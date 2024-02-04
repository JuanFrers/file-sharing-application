import { SignInInterface, SignInInterfaceRequest, SignInInterfaceResponse } from '../../interfaces/use-cases/authentication/SignInInterface';
import { GetUserByUsernameRepositoryInterface } from '../../../domain/repositories/authentication/GetUserByUsernameRepositoryInterface';
import { HashComparer } from '../../interfaces/cryptography/HashComparer';
import { JWTGenerator } from '../../interfaces/cryptography/JWTGenerator';
import { UnauthorizedError } from '../../errors/UnauthorizedError';

export class SignIn implements SignInInterface {
  private getUserByUsernameRepository: GetUserByUsernameRepositoryInterface | undefined;

  constructor(
    private readonly hashComparer: HashComparer,
    private readonly jwtGenerator: JWTGenerator,
  ) {}

  setupRuntimeDependencies(
    getUserByUsernameRepository: GetUserByUsernameRepositoryInterface,
  ): void {
    this.getUserByUsernameRepository = getUserByUsernameRepository;
  }

  async execute(
    credentials: SignInInterfaceRequest,
  ): Promise<SignInInterfaceResponse> {
    const { username, password } = credentials;
    if (!this.getUserByUsernameRepository) {
      throw new Error();
    }
    const user = await this.getUserByUsernameRepository.getUserByUsername(username);
    if (!user) {
      return new UnauthorizedError();
    }
    const isPasswordValid = await this.hashComparer.compare(password, user.password);
    if (!isPasswordValid) {
      return new UnauthorizedError();
    }
    return this.jwtGenerator.generate(String(user.id));
  }
}
