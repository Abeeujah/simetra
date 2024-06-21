/**
 * @openapi
 * components:
 *  schemas:
 *      # Email.
 *      Email:
 *          type: string
 *          format: email
 *          minLength: 5
 *          maxLength: 5
 *          description: Provisioned email address.
 * 
 *      # Password.
 *      Password:
 *          type: string
 *          format: password
 *          minLength: 7
 *          maxLength: 255
 *          description: Account password.
 * 
 *      # OTP
 *      OTP:
 *          type: string
 *          minLength: 5
 *          maxLength: 10
 *          description: One time password.
 * 
 *      # User credentials.
 *      UserCredentials:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  $ref: '#/components/schemas/Email'
 *                  description: The email address of the user creating an account.
 *              password:
 *                  $ref: '#/components/schemas/Password'
 *                  description: The password of the user creating an account.
 * 
 *      # Signup.
 *      Signup:
 *          type: object
 *          allOf:
 *              - $ref: '#/components/schemas/UserCredentials'
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  minLength: 3
 *                  maxLength: 255
 *                  description: The name of the user creating an account.
 * 
 *      # Signin.
 *      Signin:
 *          $ref: '#/components/schemas/UserCredentials'
 *      # Error schema.
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
 * 
 *      # Success
 *      Success:
 *          type: object
 *          allOf:
 *              - $ref: '#/components/schemas/Error'
 *          required:
 *              - data
 *          properties:
 *              data:
 *                  type: object
 *                  description: The response data object.
 * 
 *      # Reset Password.
 *      ResetPassword:
 *          type: object
 *          required:
 *              - password
 *              - confirmPassword
 *          properties:
 *              password:
 *                  type: Password
 *                  description: The new password.
 *              confirmPassword:
 *                  type: Password
 *                  description: Password confirmation.
 * 
 *      # Gender
 *      Gender:
 *          type: string
 *          enum:
 *              - MALE
 *              - FEMALE
 *          description: The gender of the user (MALE, FEMALE)
 * 
 *      # Create Profile.
 *      CreateProfile:
 *          type: object
 *          required:
 *              - gender
 *              - phone
 *              - address
 *          properties:
 *              gender:
 *                  type: Gender
 *              phone:
 *                  type: string
 *                  description: The phone contact address of the user, country code is supported.
 *              address:
 *                  type: string
 *                  description: The residential address of the user.
 * 
 *      # UserType.
 *      UserType:
 *          type: string
 *          enum:
 *              # "SELLER" | "RIDER" | "SHOPPER" | "FREELANCER" | "SERVICES" | "EXPLORER"
 *              - SELLER
 *              - RIDER
 *              - SHOPPER
 *              - FREELANCER
 *              - SERVICES
 *              - EXPLORER
 *          description: The function the user performs in the application.
 * 
 *      # PatchUserProfile
 *      PatchUserProfile:
 *          type: object
 *          properties:
 *              gender:
 *                  type: Gender
 *              phone:
 *                  type: string
 *                  description: The phone contact address of the user, country code is supported.
 *              address:
 *                  type: string
 *                  description: The residential address of the user.
 *              userType:
 *                  type: UserType
 * 
 *      # PatchUser
 *      PatchUser:
 *          type: object
 *          properties:
 *              email:
 *                  $ref: '#components/schemas/Email'
 *                  description: The email address to be updated to.
 *              name:
 *                  type: string
 *                  minLength: 3
 *                  maxLength: 255
 *                  description: The name of the user creating an account.
 * 
 *      # File
 *      ProfilePhoto:
 *          type: object
 *          properties:
 *              photo:
 *                  type: string
 *                  format: binary
 *                  description: The profile photo.
 * 
 *      # Freelancer Schema
 *      Freelancer:
 *          type: object
 *          properties:
 *              serviceType:
 *                  type: string
 *                  description: The service to be rendered on the platform
 *              bio:
 *                  type: string
 *                  description: A brief descriptive expository on your service and your offerings
 *              experienceYears:
 *                  type: string
 *                  description: Years of experience in the field.
 *              officeAddress:
 *                  type: string
 *                  description: Your physical location where you offer this service
 *              externalLink:
 *                  type: string
 *                  description: A link containing references to your past projects.
 *              profilePhoto:
 *                  type: string
 *                  format: binary
 *                  description: The display picture of your freelancer page.
 *              coverBanner:
 *                  type: string
 *                  format: binary
 *                  description: The cover photo of your freelancer profile page.
 *              imageReferenceI:
 *                  type: string
 *                  format: binary
 *                  description: The first image reference showcasing your past works.
 *              imageReferenceII:
 *                  type: string
 *                  format: binary
 *                  description: The second image reference showcasing your past works.
 *              imageReferenceIII:
 *                  type: string
 *                  format: binary
 *                  description: The third image reference showcasing your past works.
 *              imageReferenceIV:
 *                  type: string
 *                  format: binary
 *                  description: The fourth image reference showcasing your past works.
 * 
 *      # Freelancer Setup
 *      FreelancerSetup:
 *          type: object
 *          allOf:
 *              - $ref: '#components/schemas/Freelancer'
 *          required:
 *              - serviceType
 *              - bio
 *              - experienceYears
 *              - officeAddress
 *              - coverBanner
 *              - profilePhoto
 * 
 *      # Rider Schema
 *      Rider:
 *          type: object
 *          properties:
 *              vehicleModel:
 *                  type: string
 *                  description: The model of your vehicle.
 *              vehicleName:
 *                  type: string
 *                  description: The name of your vehicle.
 *              vehiclePlateNumber:
 *                  type: string
 *                  description: The number plate on your vehicle.
 *              location:
 *                  type: string
 *                  description: Your domicile location for easy rides and delivery pickups.
 *              riderPicture:
 *                  type: string
 *                  format: binary
 *                  description: A clear image of you to be displayed on your profile and ride requests.
 *              vehiclePicture:
 *                  type: string
 *                  format: binary
 *                  description: A clear image of your vehicle to be displayed on your profile and ride requests.
 *              vehicleDocument:
 *                  type: string
 *                  format: binary
 *                  description: A document confirming the vehicle is registered and licensed to make trips.
 * 
 *      # Rider Setup
 *      RiderSetup:
 *          type: object
 *          allOf:
 *              - $ref: '#components/schemas/Rider'
 *          required:
 *              - vehicleModel
 *              - vehicleName
 *              - vehiclePlateNumber
 *              - location
 *              - riderPicture
 *              - vehiclePicture
 *              - vehicleDocument
 * 
 *      # Seller Schema
 *      Seller:
 *          type: object
 *          properties:
 *              storeName:
 *                  type: string
 *                  description: Your unique storefront name.
 *              itemsType:
 *                  type: string
 *                  description: The type of items you're trying to sell on the platform.
 *              location:
 *                  type: string
 *                  description: Physical location where your store is located.
 *              profilePhoto:
 *                  type: string
 *                  format: binary
 *                  description: A display photo for your storefront page.
 *              coverBanner:
 *                  type: string
 *                  format: binary
 *                  description: A cover photo for your storefront page.
 * 
 *      # Seller Setup
 *      SellerSetup:
 *          type: object
 *          allOf:
 *              - $ref: '#components/schemas/Seller'
 *          required:
 *              - storeName
 *              - itemsType
 *              - location
 *              - profilePhoto
 *              - coverBanner
 */