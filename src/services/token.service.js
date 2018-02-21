import TokenAlreadyExistsError from '../errors/TokenAlreadyExistsError';
import TokenNotFound from '../errors/TokenNotFound';

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

  /**
   * Gets a token by project id or token id
   * @param id the id to get a token by
   * @returns {Promise<token>} the token
   */
  async getToken(id) {
    // find a token by id or project id
    const token = await this.tokenRepository.find({
      where: {
        $or: {
          projectId: id,
          id
        }
      }
    });

    if (!token) {
      throw new TokenNotFound(`Token with id ${id} not found`);
    }

    return token;
  }

  /**
   * Deletes a token by token id or project id
   * @param id the id of the token to delete
   */
  async deleteToken(id) {
    const token = await this.getToken(id);
    token.destroy();
  }
}
