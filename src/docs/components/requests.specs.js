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
 * 
 *      # Patch User Profile
 *      PatchUserProfile:
 *          description: Update user profile to current desired.
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/PatchUserProfile'
 *                  example:
 *                      gender: FEMALE
 *                      phone: "09012345678"
 *                      address: The White House
 *                      userType: SHOPPER
 * 
 *      # Upload Profile Photo
 *      UploadProfilePhoto:
 *          description: Upload profile photo.
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#components/schemas/ProfilePhoto'
 * 
 *      # Setup Freelancer Account
 *      FreelancerSetup:
 *          description: Setup your Freelancer Account.
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#components/schemas/FreelancerSetup'
 * 
 *      # Update Freelancer Account
 *      FreelancerUpdate:
 *          description: Update your Freelancer Account.
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#components/schemas/Freelancer'
 * 
 *      # Setup Rider Account
 *      RiderSetup:
 *          description: Setup your Rider Account.
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#components/schemas/RiderSetup'
 * 
 *      # Update Rider Account
 *      RiderUpdate:
 *          description: Update your Rider Account.
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#components/schemas/Rider'
 * 
 *      # Setup Seller Account
 *      SellerSetup:
 *          description: Setup your Seller Account.
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#components/schemas/SellerSetup'
 * 
 *      # Update Seller Account
 *      SellerUpdate:
 *          description: Update your Seller Account.
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#components/schemas/Seller'
 * 
 *      # List a Product
 *      CreateProduct:
 *          description: List a Product for sale.
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#components/schemas/CreateProduct'
 * 
 *      # Update a Product
 *      UpdateProduct:
 *          description: Update an already listed Product.
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#components/schemas/Product'
 */