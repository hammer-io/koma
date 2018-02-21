import TokenAlreadyExistsError from '../errors/TokenAlreadyExistsError';

export default class TokenService {
  constructor(tokenRepository, logger) {
    this.log = logger;
    this.tokenRepository = tokenRepository;
  }

  /**
   * Creates a new token for the project
   * @param projectId the project id to create a token for
   * @returns {Promise<token>} returns the token that was created
   */
  async createNewToken(projectId) {
    // check if token already exists
    const project = await this.tokenRepository.find({
      where: {
        projectId
      }
    });

    if (project) {
      throw new TokenAlreadyExistsError(`Token already exists for ${projectId}`);
    }

    const token = { projectId };
    const tokenCreated = this.tokenRepository.create(token);
    this.log.info('Created new token!');
    return tokenCreated;
  }
}
