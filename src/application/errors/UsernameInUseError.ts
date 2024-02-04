export class UsernameInUseError extends Error {
  constructor() {
    super('username is already in use');
    this.name = 'UsernameInUseError';
  }
}
