// API Health Check
/**
 * @openapi
 * # Health check endpoint
 * /healthz:
 *  get:
 *      description: This endpoint provides a basic health check of the API service, including the database latency and connection status.
 *      summary: Server health check.
 *      tags: [Health]
 *      operationId: healthCheck
 *      responses:
 *          '200':
 *              description: The API is healthy and operational.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: The API status.
 *                              database:
 *                                  type: object
 *                                  description: The database status.
 *                                  properties:
 *                                      connected:
 *                                          type: boolean
 *                                          description: The database connection status.
 *                                      latency:
 *                                          type: string
 *                                          description: The database read/write latency.
 *          '503':
 *              $ref: '#/components/responses/InternalServerError'
 */