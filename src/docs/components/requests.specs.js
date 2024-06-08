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
 */