/**
 * @openapi
 * /api/accounts/rider:
 *  # Register Rider Endpoint
 *  post:
 *      description: This endpoint allows a user to register to become a verified rider on the platform.
 *      summary: Register a Rider
 *      tags: [Rider]
 *      operationId: riderSetup
 *      requestBody:
 *          $ref: '#components/requestBodies/RiderSetup'
 *      responses:
 *          '201':
 *              $ref: '#components/responses/Success'
 *          '400':
 *              $ref: '#components/responses/BadRequest'
 *          '401':
 *              $ref: '#components/responses/Unauthorized'
 *          '403':
 *              $ref: '#components/responses/Forbidden'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 *  # Retrieve all Riders
 *  get:
 *      description: This endpoint retrieves all riders on the platform, using cursor based pagination to limit payload size.
 *      summary: View all Riders
 *      tags: [Rider]
 *      operationId: viewAllRiders
 *      parameters:
 *          -   in: query
 *              name: cursor
 *              description: The cursor to the set of documents to be fetched next.
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              $ref: '#components/responses/Success'
 *          '401':
 *              $ref: '#components/responses/Unauthorized'
 *          '403':
 *              $ref: '#components/responses/Forbidden'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 * /api/accounts/rider/{riderId}:
 *  parameters:
 *      -   name: riderId
 *          in: path
 *          required: true
 *          description: The rider identifier, as riderId.
 *          schema:
 *              type: string
 * 
 *  # View a Rider
 *  get:
 *      description: This endpoint retrieves the rider profile, as identified by the riderId.
 *      summary: View a Rider.
 *      tags: [Rider]
 *      operationId: viewARider
 *      responses:
 *          '200':
 *              $ref: '#components/responses/Success'
 *          '401':
 *              $ref: '#components/responses/Unauthorized'
 *          '403':
 *              $ref: '#components/responses/Forbidden'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 *  # Delete a Rider
 *  delete:
 *      description: This endpoint allows you to delete your rider profile, as identified by the riderId.
 *      summary: Delete a Rider.
 *      tags: [Rider]
 *      operationId: deleteARider
 *      responses:
 *          '200':
 *              $ref: '#components/responses/Success'
 *          '401':
 *              $ref: '#components/responses/Unauthorized'
 *          '403':
 *              $ref: '#components/responses/Forbidden'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 *  # Update a Rider
 *  patch:
 *      description: This endpoint allows you to update your rider profile, as identified by the riderId.
 *      summary: Update your Rider Profile.
 *      tags: [Rider]
 *      operationId: updateARider
 *      requestBody:
 *          $ref: '#components/requestBodies/RiderUpdate'
 *      responses:
 *          '200':
 *              $ref: '#components/responses/Success'
 *          '401':
 *              $ref: '#components/responses/Unauthorized'
 *          '403':
 *              $ref: '#components/responses/Forbidden'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 */