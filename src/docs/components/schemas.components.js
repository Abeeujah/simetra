/**
 * @openapi
 * components:
 *  schemas:
 *      Error:
 *          type: object
 *          required:
 *              - success
 *              - message
 *          properties:
 *              success:
 *                  type: boolean
 *                  description: Indicates if the request was successful. (false for errors)
 *              message:
 *                  type: string
 *                  description: A human-readable explanation of the error.
 */