/**
 * @openapi
 * /api/accounts/freelancer:
 *  # Register Freelancer Endpoint
 *  post:
 *      description: This endpoint allows a user to register to become a validated freelancer on the platform.
 *      summary: Register to become a Freelancer.
 *      tags: [Freelancer]
 *      operationId: freelancerSetup
 *      requestBody:
 *          $ref: '#components/requestBodies/FreelancerSetup'
 *      responses:
 *          '201':
 *              $ref: '#components/responses/Success'
 *          '400':
 *              $ref: '#components/responses/BadRequest'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 *  # Retrieve all Freelancers
 *  get:
 *      description: This endpoint retrieves all freelancers on the platform, using cursor based pagination to limit payload size.
 *      summary: View all Freelancers.
 *      tags: [Freelancer]
 *      operationId: viewAllFreelancers
 *      parameters:
 *          -   in: query
 *              name: cursor
 *              description: The cursor to the set of documents to be fetched next.
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              $ref: '#components/responses/Success'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 * /api/accounts/freelancer/{freelancerId}:
 *  parameters:
 *      - name: freelancerId
 *        in: path
 *        required: true
 *        description: The freelancer identifier, as freelancerId
 *        schema:
 *          type: string
 * 
 *  # View a Freelancer
 *  get:
 *      description: This endpoint retrieves the freelancer profile identified with the given freelancerId.
 *      summary: View a Freelancer Profile.
 *      tags: [Freelancer]
 *      operationId: viewAFreelancer
 *      responses:
 *          '200':
 *              $ref: '#components/responses/Success'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 *  # Delete a Freelancer
 *  delete:
 *      description: This endpoint deletes a freelancer identified with the freelancer identifier.
 *      summary: Delete your Freelancer Profile.
 *      tags: [Freelancer]
 *      operationId: deleteAFreelancer
 *      responses:
 *          '204':
 *              $ref: '#components/responses/Success'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 *  # Update a Freelancer
 *  patch:
 *      description: This endpoint allows a freelancer identified by the freelancerId to update his freelancer profile.
 *      summary: Update your Freelancer Profile.
 *      tags: [Freelancer]
 *      operationId: updateAFreelancer
 *      requestBody:
 *          $ref: '#components/requestBodies/FreelancerUpdate'
 *      responses:
 *          '200':
 *              $ref: '#components/responses/Success'
 *          '400':
 *              $ref: '#components/responses/BadRequest'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 */