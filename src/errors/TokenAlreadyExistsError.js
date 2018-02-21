export default class TokenAlreadyExistsError {
  constructor(message) {
    this.message = message;
    this.type = 'Duplicate Token';
    this.status = 422;
  }
}
