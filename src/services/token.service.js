export default class TokenService {
  constructor(logger) {
    this.log = logger;
  }

  createNewToken() {
    // TODO
    this.log.info('Created new token!');
  }
}
