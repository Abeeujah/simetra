/**
 * @openapi
 * components:
 *  responses:
 *      # Internal server error response.
 *      InternalServerError:
 *          description: Internal server error.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Error'
 *                  example:
 *                      success: false
 *                      message: There was an error processing your request.
 *      # Server success response.
 *      SuccessResponse:
 *          description: Server executes requests and responds successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Success'
 *                  example:
 *                      success: true
 *                      message: Request executed successfully
 *                      data:
 *      # Auth response
 *      SignupResponse:
 *          description: Your account has been created successfully.
 *          content:
 *              application/json:
 *                  example:
 *                      success: true
 *                      message: Registration successful.
 *                      data:
 *                          user:
 *                              _id: 1234567890
 *                              email: kai@havertz.com
 *                          accessToken: eyJhbGciOiJSUzI1NiIsInR5cCI6
 *                          refreshToken: eyJhbGciOiJSUzI1NiIsInR5cCI6
 *          allOf:
 *              - $ref: '#/components/responses/SuccessResponse'
 *      SigninResponse:
 *          description: Signed into your account successfully.
 *          allOf:
 *              - $ref: '#/components/responses/SignupResponse'
 */