export class FileAlreadyExistsError extends Error {
  constructor() {
    super('file already exists');
    this.name = 'FileAlreadyExistsError';
  }
}
