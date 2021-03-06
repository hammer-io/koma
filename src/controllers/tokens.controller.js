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
    return res.status(400).json({ errors: errors.mapped() });
  }

  try {
    const token = await tokenService.createNewToken(req.body.projectId);
    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for GET /tokens/:tokenOrProjectId route
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function getToken(req, res, next) {
  try {
    const token = await tokenService.getToken(req.params.tokenOrProjectId);
    res.send({ token });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for DELETE /tokens/:tokenOrProjectId route
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function deleteToken(req, res, next) {
  try {
    await tokenService.deleteToken(req.params.tokenOrProjectId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export function setDependencies(newTokenService) {
  tokenService = newTokenService;
}
