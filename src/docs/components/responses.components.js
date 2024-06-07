/**
 * @openapi
 * components:
 *  responses:
 *      InternalServerError:
 *          description: Internal server error.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
 *                  example:
 *                      success: false
 *                      message: The server is currently under maintenance.
 */