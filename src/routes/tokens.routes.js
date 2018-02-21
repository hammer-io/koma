import express from 'express';
import passport from 'passport';
import * as controller from '../controllers/tokens.controller';
import * as middleware from '../middlewares/tokens.middleware';

export const router = express.Router();

// Add short delay to prevent brute-force attacks
router.use((req, res, next) => {
  const delayMillis = 1000;
  setTimeout(next, delayMillis);
});

// Every request to the API must be authenticated via the bearer API token
router.use(passport.authenticate('bearer', { session: false }));

/**
 * @api {post} /tokens Post New API Token
 * @apiVersion 1.0.0
 * @apiName Post Token
 * @apiGroup Tokens
 *
 * @apiPermission Endor only (Authorization: "Bearer <token>")
 *
 * @apiParam {String} projectId The id of the project to create the token for
 *
 * @apiSuccess {Object} token an object with the token information such as id, token, projectId,
 * and created/updated dates
 *
 * @apiSuccessExample {json} Success Response
 * {
    "token": {
        "id": "8b004799-23ff-4f23-9567-c64112caf9e9",
        "token": "57045c56-1bd4-435b-9a9a-e03a906fa723",
        "projectId": "a3",
        "updatedAt": "2018-02-21T00:31:12.293Z",
        "createdAt": "2018-02-21T00:31:12.293Z"
    }
  }
 */
router.post('/tokens', middleware.checkCreateNewToken(), controller.generateNewToken);

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
router.get('/tokens ', controller.getTokens);

/**
 * @api {delete} /tokens/:tokenId Delete Token
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