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
 * /api/profile:
 * # View Profile endpoint
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
 * # Update Profile endpoint
 *  patch:
 *      description: This endpoint allows users to update a specific set of properties within their existing profile information. Provide a JSON object in the request body containing only the properties you intend to modify. 
 *      summary: Update User Profile (Partial)
 *      tags: [Profile]
 *      operationId: patchUserProfile
 *      requestBody:
 *          $ref: '#components/requestBodies/PatchUserProfile'
 * 
 * # Delete Profile endpoint
 *  delete:
 *      description: This endpoint allows authorized users to permanently delete their own user profile and associated data. Use this endpoint with caution as the deletion cannot be undone.
 *      summary: Delete User Profile.
 *      tags: [Profile]
 *      operationId: deleteUserProfile
 *      responses:
 *          '204':
 *              $ref: '#components/responses/Success'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 * /api/profile/user:
 * # Update User endpoint
 *      patch:
 *          description: This endpoint allows users to update their existing information. Provide a valid user data in the request body to modify specific details associated with that user.
 *          summary: Update User PII (Partial).
 *          tags: [User]
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
 * 
 * # Delete User endpoint
 *      delete:
 *          description: This endpoint allows authorized users to delete their specific user account. Provide a valid session ID to permanently remove the associated user and their data.
 *          summary: Delete User.
 *          tags: [User]
 *          operationId: deleteUser
 *          responses:
 *              '204':
 *                  $ref: '#components/responses/Success'
 *              '404':
 *                  $ref: '#components/responses/NotFound'
 *              '500':
 *                  $ref: '#components/responses/InternalServerError'
 * 
 * # Read/View User endpoint
 *      get:
 *          description: This endpoint retrieves information about a specific user. Provide a valid session to get details about the associated user account.
 *          summary: View User.
 *          tags: [User]
 *          operationId: viewUser
 *          responses:
 *              '200':
 *                  $ref: '#components/responses/Success'
 *              '404':
 *                  $ref: '#components/responses/NotFound'
 *              '500':
 *                  $ref: '#components/responses/InternalServerError'
 */