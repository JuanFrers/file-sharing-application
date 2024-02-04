export class NoSuchUserError extends Error {
  constructor() {
    super('user does not exist');
    this.name = 'NoSuchUserError';
  }
}
