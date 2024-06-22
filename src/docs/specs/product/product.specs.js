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
 *
 * # Products Path
 * /api/accounts/seller/{sellerId}/products/{productId}:
 *  parameters:
 *      - name: sellerId
 *        in: path
 *        required: true
 *        description: The seller identifier as sellerId
 *        schema:
 *          type: string
 *      - name: productId
 *        in: path
 *        required: true
 *        description: The product identifier, as productId.
 *        schema:
 *          type: string
 * 
 *  # Update Product Endpoint
 *  patch:
 *      description: This endpoint allows you to update an already listed product.
 *      summary: Update your listed product.
 *      tags: [Product]
 *      operationId: updateProduct
 *      requestBody:
 *          $ref: '#components/requestBodies/UpdateProduct'
 *      responses:
 *          '200':
 *              $ref: '#components/responses/Success'
 *          '400':
 *              $ref: '#components/responses/BadRequest'
 *          '401':
 *              $ref: '#components/responses/Unauthorized'
 *          '403':
 *              $ref: '#components/responses/Forbidden'
 *          '404':
 *              $ref: '#components/responses/NotFound'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 *  # Delete Product Endpoint
 *  delete:
 *      description: This endpoint allows you to delete an already listed product.
 *      summary: Delete your listed product.
 *      tags: [Product]
 *      operationId: deleteProduct
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