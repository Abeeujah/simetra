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
 * 
 *      BadRequest:
 *          description: Bad request.
 *          allOf:
 *              - $ref: '#/components/responses/InternalServerError'
 *          content:
 *              application/json:
 *                  example:
 *                      success: false
 *                      message: Validation error, please provide valid request payload.
 * 
 *      Unauthorized:
 *          description: Unauthorized (invalid username or password).
 *          allOf:
 *              - $ref: '#/components/responses/InternalServerError'
 *          content:
 *              application/json:
 *                  example:
 *                      success: false
 *                      message: Please provide valid credentials or claims to complete this request.
 * 
 *      NotFound:
 *          description: Missing, not found.
 *          allOf:
 *              - $ref: '#/components/responses/InternalServerError'
 *          content:
 *              application/json:
 *                  example:
 *                      success: false
 *                      message: The requested credential is missing or wasn't found.
 * 
 *      AlreadyExists:
 *          description: The provided entity already exists.
 *          allOf:
 *              - $ref: '#/components/responses/InternalServerError'
 *          content:
 *              application/json:
 *                  example:
 *                      success: false
 *                      message: Duplicates not allowed, please provide a different value.
 * 
 *      Forbidden:
 *          description: Unauthorized to perform this action.
 *          allOf:
 *              - $ref: '#/components/responses/InternalServerError'
 *          content:
 *              application/json:
 *                  example:
 *                      success: false
 *                      message: You are unauthorized to perform this action.
 * 
 *      # Server success response.
 *      Success:
 *          description: Server executes requests and responds successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Success'
 *                  example:
 *                      success: true
 *                      message: Request executed successfully.
 *                      data:
 *      # Auth response
 *      ForgotPassword:
 *          description: OTP emailed successfully.
 *          content:
 *              application/json:
 *                  example:
 *                      success: true
 *                      message: Registration successful.
 *                      data:
 *                          otpToken: eyJhbGciOiJSUzI1NiIsInR5cCI6
 *          allOf:
 *              - $ref: '#/components/responses/Success'
 *      Signup:
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
 *              - $ref: '#/components/responses/Success'
 *      Signin:
 *          description: Signed into your account successfully.
 *          allOf:
 *              - $ref: '#/components/responses/Signup'
 */