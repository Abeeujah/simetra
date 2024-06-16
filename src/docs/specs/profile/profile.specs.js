/**
 * @openapi
 * # Create Profile endpoint
 * /api/profile/create:
 *  post:
 *      description: This endpoint allows users to create a profile on the platform, for their existing user account. Provide a valid data in the request body to create the profile details associated with that user.
 *      summary: Create User Profile.
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
 * 
 * # UserType endpoint
 * /api/profile/usertype:
 *  post:
 *      description: This endpoint allows users to update their function within the application. Choose a new role from the available options to modify the user, it defaults to *EXPLORER* if none is set.
 *      summary: Update user type.
 *      tags: [Profile]
 *      operationId: updateUserType
 *      requestBody:
 *          $ref: '#/components/requestBodies/UpdateUserType'
 *      responses:
 *          '200':
 *              $ref: '#/components/responses/Success'
 *          '400':
 *              $ref: '#/components/responses/BadRequest'
 *          '401':
 *              $ref: '#/components/responses/Unauthorized'
 *          '404':
 *              $ref: '#/components/responses/NotFound'
 *          '500':
 *              $ref: '#/components/responses/InternalServerError'
 * 
 * # View Profile endpoint
 * /api/profile:
 *  get:
 *      description: This endpoint retrieves the current user's profile information. A successful response will return a JSON object containing details about the user's account.
 *      summary: View User Profile.
 *      tags: [Profile]
 *      operationId: viewUserProfile
 *      responses:
 *          '200':
 *              $ref: '#components/responses/Success'
 *          '404':
 *              $ref: '#components/responses/BadRequest'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 * # Update User endpoint
 * /api/profile/user:
 *      patch:
 *          description: This endpoint allows users to update their existing information. Provide a valid user data in the request body to modify specific details associated with that user.
 *          summary: Update User PII
 *          tags: [Profile]
 *          operationId: patchUser
 *          requestBody:
 *              $ref: '#components/requestBodies/PatchUser'
 *          responses:
 *              '200':
 *                  $ref: '#components/responses/Success'
 *              '400':
 *                  $ref: '#components/responses/BadRequest'
 *              '404':
 *                  $ref: '#components/responses/NotFound'
 *              '500':
 *                  $ref: '#components/responses/InternalServerError'
 */