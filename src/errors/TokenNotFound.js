export default class TokenNotFound {
  constructor(message) {
    this.message = message;
    this.type = 'Not Found';
    this.status = 404;
  }
}
