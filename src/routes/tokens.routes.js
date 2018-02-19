import express from 'express';
import passport from 'passport';
import * as controller from '../controllers/tokens.controller';

export const router = express.Router();

// Every request to the API must be authenticated via the bearer API token
router.use(passport.authenticate('bearer', { session: false }));

/**
 * @api {post} /tokens Post New API Token
 * @apiVersion 1.0.0
 * @apiName Post Token
 * @apiGroup Tokens
 *
 * @apiPermission Endor only (Authorization: "Bearer <token>")
 */
router.post('/tokens', controller.generateNewToken);


/**
 * @api {get} /tokens Get Tokens
 * @apiVersion 1.0.0
 * @apiName Get Tokens
 * @apiGroup Tokens
 *
 * @apiPermission Endor only (Authorization: "Bearer <token>")
 *
 * @apiParam {String} projectId The id of the project to filter tokens by
 * @apiParam [String] tokenId The id of the token being requested (not the token string itself)
 */
router.get('/tokens', controller.getTokens);

/**
 * @api {get} /tokens/:tokenId Delete Token
 * @apiVersion 1.0.0
 * @apiName Delete Token
 * @apiGroup Tokens
 *
 * @apiPermission Endor only (Authorization: "Bearer <token>")
 *
 * @apiParam {String} tokenId The id of the token being deleted (not the token string itself)
 */
router.delete('/tokens/:tokenId', controller.deleteToken);

export function setDependencies(tokensService) {
  controller.setDependencies(tokensService);
}
