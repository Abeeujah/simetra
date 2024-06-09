/**
 * @openapi
 * # Signup endpoint
 * /api/auth/signup:
 *  post:
 *      description: This endpoint allows users to register on the application. A successful registration will result in a new user account being created and a corresponding response containing details about the newly created user.
 *      summary: Creates a new user account.
 *      tags: [Auth]
 *      operationId: signUp
 *      requestBody:
 *          $ref: '#/components/requestBodies/Signup'
 *      responses:
 *          '201':
 *              $ref: '#/components/responses/Signup'
 *          '400':
 *              $ref: '#/components/responses/BadRequest'
 *          '409':
 *              $ref: '#/components/responses/AlreadyExists'
 *          '500':
 *              $ref: '#/components/responses/InternalServerError'
 * 
 * # Signin endpoint
 * /api/auth/signin:
 *  post:
 *      description: This endpoint allows registered users to authenticate and obtain an authorization token for accessing protected resources within your application.
 *      summary: Sign in to your account.
 *      tags: [Auth]
 *      operationId: signIn
 *      requestBody:
 *          $ref: '#components/requestBodies/Signin'
 *      responses:
 *          '200':
 *              $ref: '#/components/responses/Signin'
 *          '400':
 *              $ref: '#/components/responses/BadRequest'
 *          '401':
 *              $ref: '#/components/responses/Unauthorized'
 *          '404':
 *              $ref: '#/components/responses/NotFound'
 *          '500':
 *              $ref: '#/components/responses/InternalServerError'
 * 
 * # Forgot-Password endpoint
 * /api/auth/forgot-password:
 *  post:
 *      description: This endpoint allows users to initiate the forgot password process by providing their registered email address. If the email is valid, a one time password (OTP) is sent to the user's inbox to proceed with the password reset.
 *      summary: Initiate forgot password process.
 *      tags: [Auth]
 *      operationId: forgotPassword
 *      requestBody:
 *          $ref: '#components/requestBodies/ForgotPassword'
 *      responses:
 *          '200':
 *              $ref: '#components/responses/ForgotPassword'
 *          '400':
 *              $ref: '#components/responses/BadRequest'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 * # Verify OTP endpoint
 * /api/auth/verify-otp:
 *  post:
 *      description: This endpoint allows users to verify a one-time password (OTP) that was previously sent to them (e.g., via SMS, email). A successful verification will typically grant access to a protected resource or action within your application.
 *      summary: Verify One-Time Password.
 *      tags: [Auth]
 *      operationId: verifyOTP
 *      requestBody:
 *          $ref: '#components/requestBodies/VerifyOTP'
 *      responses:
 *          '200':
 *              $ref: '#components/responses/Success'
 *          '400':
 *              $ref: '#components/responses/BadRequest'
 *          '408':
 *              $ref: '#components/responses/Expired'
 *          '409':
 *              $ref: '#components/responses/AlreadyExists'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 */