/**
 * @openapi
 * /api/accounts/seller/{sellerId}/products:
 *  # List a Product
 *  post:
 *      parameters:
 *          -   name: sellerId
 *              in: path
 *              required: true
 *              description: The product seller, identified as sellerId
 *              schema:
 *                  type: string
 *      description: This endpoint allows registered sellers to list a product for sale on the platform.
 *      summary: List a Product.
 *      tags: [Product]
 *      operationId: listProduct
 *      requestBody:
 *          $ref: '#components/requestBodies/CreateProduct'
 *      responses:
 *          '201':
 *              $ref: '#components/responses/Success'
 *          '401':
 *              $ref: '#components/responses/Unauthorized'
 *          '403':
 *              $ref: '#components/responses/Forbidden'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 */