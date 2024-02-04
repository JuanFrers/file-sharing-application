export class NoSuchFileError extends Error {
  constructor() {
    super('file does not exist');
    this.name = 'NoSuchFileError';
  }
}
