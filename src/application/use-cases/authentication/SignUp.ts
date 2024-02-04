import { SignUpInterface, SignUpInterfaceRequest, SignUpInterfaceResponse } from '../../interfaces/use-cases/authentication/SignUpInterface';
import { GetUserByUsernameRepositoryInterface } from '../../../domain/repositories/authentication/GetUserByUsernameRepositoryInterface';
import { CreateUserRepositoryInterface } from '../../../domain/repositories/authentication/CreateUserRepositoryInterface';
import { HashGenerator } from '../../interfaces/cryptography/HashGenerator';
import { UsernameInUseError } from '../../errors/UsernameInUseError';

export class SignUp implements SignUpInterface {
  private getUserByUsernameRepository: GetUserByUsernameRepositoryInterface | undefined;

  private createUserRepository: CreateUserRepositoryInterface | undefined;

  constructor(
    private readonly hashGenerator: HashGenerator,
  ) { }

  setupRuntimeDependencies(
    getUserByUsernameRepository: GetUserByUsernameRepositoryInterface,
    createUserRepository: CreateUserRepositoryInterface,
  ): void {
    this.getUserByUsernameRepository = getUserByUsernameRepository;
    this.createUserRepository = createUserRepository;
  }

  async execute(
    userData: SignUpInterfaceRequest,
  ): Promise<SignUpInterfaceResponse> {
    if (!this.getUserByUsernameRepository || !this.createUserRepository) {
      throw new Error();
    }
    const { username, password } = userData;
    const existingUser = await this.getUserByUsernameRepository.getUserByUsername(username);
    if (existingUser) {
      return new UsernameInUseError();
    }
    const hashedPassword = await this.hashGenerator.hash(password);
    return this.createUserRepository.createUser({
      ...userData,
      password: hashedPassword,
    });
  }
}
