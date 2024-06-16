/**
 * @openapi
 * components:
 *  schemas:
 *      # Email schema.
 *      Email:
 *          type: string
 *          format: email
 *          minLength: 5
 *          maxLength: 5
 *          description: Provisioned email address.
 * 
 *      # Password schema.
 *      Password:
 *          type: string
 *          format: password
 *          minLength: 7
 *          maxLength: 255
 *          description: Account password.
 * 
 *      # OTP schema
 *      OTP:
 *          type: string
 *          minLength: 5
 *          maxLength: 10
 *          description: One time password.
 * 
 *      # User credentials schema.
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
 *      # Signup schema.
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
 *      # Signin schema.
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
 *      # Success schema
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
 *      # Reset Password schema
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
 */