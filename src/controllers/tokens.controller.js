let tokenService = {};

export async function generateNewToken(req, res, next) {
  // TODO: Validation
  try {
    // TODO: Generate token
    tokenService.createNewToken();
    // TODO: Save token
    // TODO: Return token
    res.send('success');
  } catch (error) {
    next(error);
  }
}

export async function getTokens(req, res, next) {
  // TODO: Validation
  try {
    // TODO: Get tokens
    // TODO: Return tokens
    res.send('success');
  } catch (error) {
    next(error);
  }
}

export async function getToken(req, res, next) {
  // TODO: Validation
  try {
    // TODO: Get tokens
    // TODO: Return tokens
    res.send('success');
  } catch (error) {
    next(error);
  }
}

export async function deleteToken(req, res, next) {
  // TODO: Validation
  try {
    // TODO: Get token
    // TODO: Delete token
    res.send('success');
  } catch (error) {
    next(error);
  }
}

export function setDependencies(newTokenService) {
  tokenService = newTokenService;
}
