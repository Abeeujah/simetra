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
 * 
 * # Reset Password Endpoint
 * /api/auth/reset-password:
 *  post:
 *      description: This endpoint allows users to reset their forgotten password. A user will be able to initiate the password reset process by providing their registered email address. An email will be sent to the provided address containing a one time password(OTP). Verifying the OTP will allow users to be able to reset their password.
 *      summary: Reset Password.
 *      tags: [Auth]
 *      operationId: resetPassword
 *      requestBody:
 *          $ref: '#components/requestBodies/ResetPassword'
 *      responses:
 *          '200':
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
 * # Request Magic Link Endpoint
 * /api/auth/request-magic-link:
 *  post:
 *      description: This endpoint allows users to request a magic link to verify their account on the platform. If the provided email address is a valid email address registered in the application, an email is sent to the user containing the verification link.
 *      summary: Request Verification.
 *      tags: [Auth]
 *      operationId: requestVerification
 *      requestBody:
 *          $ref: '#components/requestBodies/ForgotPassword'
 *      responses:
 *          '200':
 *              $ref: '#components/responses/Success'
 *          '400':
 *              $ref: '#components/responses/BadRequest'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 * # Verify Magic Link
 * /api/auth/verify-magic-link:
 *  get:
 *      description: This endpoint allows users to verify their account on the platform. Users are routed here with a magic link that contains a token, if valid; verifies their account.
 *      summary: Complete Verification.
 *      tags: [Auth]
 *      operationId: completeVerification
 *      responses:
 *          '200':
 *              '#components/responses/Success'
 *          '400':
 *              '#components/responses/BadRequest'
 *          '500':
 *              '#components/responses/InternalServerError'
 */