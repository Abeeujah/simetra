/**
 * @openapi
 * /api/accounts/seller/{sellerId}/products:
 *  parameters:
 *      - name: sellerId
 *        in: path
 *        required: true
 *        description: The seller identifier as sellerId
 *        schema:
 *          type: string
 * 
 *  # List a Product
 *  post:
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
 * 
 *  # Retrieve all Seller's Products
 *  get:
 *      description: This endpoint allows you to view all the products listed by a seller.
 *      summary: View vendor's products.
 *      tags: [Product]
 *      operationId: retrieveSellerProducts
 *      responses:
 *          '200':
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