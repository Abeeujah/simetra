/**
 * @openapi
 * components:
 *  requestBodies:
 *      # Signin
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
 *      # Signup
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
 *      # Forgot-Password
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
 *      # Verify OTP
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
 *      # Reset Password
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
 * 
 *      # Create Profile
 *      CreateProfile:
 *          description: Profile information to be associateds with your user account.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/CreateProfile'
 *                  example:
 *                      gender: MALE
 *                      phone: "08012345678"
 *                      address: Stamford Bridge.
 * 
 *      # Update UserType
 *      UpdateUserType:
 *          description: User type information to describe your function in the application.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/UserType'
 *                  example:
 *                      userType: FREELANCER
 * 
 *      # Patch User
 *      PatchUser:
 *          description: Update user PII to current desired.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/PatchUser'
 *                  example:
 *                      email: sarri@ball.com
 *                      name: Maurizio Sarri
 */