import { validationResult } from 'express-validator/check';

let tokenService = {};

/**
 * Controller for POST /tokens route
 * @param req the request
 * @param res the response
 * @param next the next middleware
 * @returns {Promise<void>}
 */
export async function generateNewToken(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  try {
    const token = await tokenService.createNewToken(req.body.projectId);
    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
}

export async function getTokens(req, res, next) {
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
