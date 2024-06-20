/**
 * @openapi
 * # Register Freelancer Endpoint
 * /api/accounts/freelancer:
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
 */