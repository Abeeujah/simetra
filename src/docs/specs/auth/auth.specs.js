/**
 * @openapi
 * # Signup endpoint
 * /api/auth/signup:
 *  post:
 *      summary: Sign up a user.
 *      tags: [Auth]
 *      operationId: signUp
 *      requestBody:
 *          $ref: '#/components/requestBodies/Signup'
 *      responses:
 *          '201':
 *              $ref: '#/components/responses/SignupResponse'
 *          '400':
 *              $ref: '#/components/responses/InternalServerError'
 *          '500':
 *              $ref: '#/components/responses/InternalServerError'
 * 
 * # Signin endpoint
 * /api/auth/signin:
 *  post:
 *      summary: Sign in to your account.
 *      tags: [Auth]
 *      operationId: signIn
 *      requestBody:
 *          $ref: '#components/requestBodies/Signin'
 *      responses:
 *          '200':
 *              $ref: '#/components/responses/SigninResponse'
 *          '400':
 *              $ref: '#/components/responses/InternalServerError'
 *          '401':
 *              $ref: '#/components/responses/InternalServerError'
 *          '404':
 *              $ref: '#/components/responses/InternalServerError'
 *          '500':
 *              $ref: '#/components/responses/InternalServerError'
 */