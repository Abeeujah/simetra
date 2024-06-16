/**
 * @openapi
 * # Create Profile endpoint
 * /api/profile/create:
 *  post:
 *      description: This endpoint allows users to create a profile on the platform, for their existing user account. Provide a valid data in the request body to create the profile details associated with that user.
 *      summary: Create User Profile
 *      tags: [Profile]
 *      operationId: createProfile
 *      requestBody:
 *          $ref: '#components/requestBodies/CreateProfile'
 *      responses:
 *          '201':
 *              $ref: '#components/responses/Success'
 *          '400':
 *              $ref: '#components/responses/BadRequest'
 *          '401':
 *              $ref: '#components/responses/Unauthorized'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 */