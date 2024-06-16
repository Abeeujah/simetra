/**
 * @openapi
 * components:
 *  requestBodies:
 *      # Signin requestBody
 *      Signin:
 *          description: Sign in to access your account.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Signin'
 *                  example:
 *                      email: kai@havertz.com
 *                      password: chelsea
 * 
 *      # Signup requestBody
 *      Signup:
 *          description: Sign up to create an account.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Signup'
 *                  example:
 *                      name: Kai Havertz
 *                      email: kai@havertz.com
 *                      password: chelsea
 * 
 *      # Forgot-Password requestBody
 *      ForgotPassword:
 *          description: Provide your registered email address to initiate a password reset flow.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Email'
 *                  example:
 *                      email: kai@havertz.com
 * 
 *      # Verify OTP requestBody
 *      VerifyOTP:
 *          description: Provide the OTP sent to your email inbox.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/OTP'
 *                  example:
 *                      otp: "36419"
 * 
 *      # Reset Password requestBody
 *      ResetPassword:
 *          description: The new password, and an additional field for confirmation.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/ResetPassword'
 *                  example:
 *                      password: pochettino
 *                      confirmPassword: pochettino
 */