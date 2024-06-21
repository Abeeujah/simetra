/**
 * @openapi
 * /api/accounts/seller:
 *  # Register Seller Endpoint
 *  post:
 *      description: This endpoint allows a user to register and become a verified seller on the platform.
 *      summary: Register a Seller.
 *      tags: [Seller]
 *      operationId: sellerSetup
 *      requestBody:
 *          $ref: '#components/requestBodies/SellerSetup'
 *      responses:
 *          '201':
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
 *  # Retrieve all Sellers
 *  get:
 *      description: This endpoint retrieves and displays all sellers on the platform, using cursor based pagination to control payload size.
 *      summary: Retrieve all Sellers.
 *      tags: [Seller]
 *      operationId: retrieveSellers
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
 * /api/accounts/seller/{sellerId}:
 *  parameters:
 *      -   name: sellerId
 *          in: path
 *          required: true
 *          description: The seller identifier, as sellerId.
 *          schema:
 *              type: string
 * 
 *  # View a Seller
 *  get:
 *      description: This endpoint retrieves the seller profile, as identified by the sellerId.
 *      summary: View a Seller.
 *      tags: [Seller]
 *      operationId: viewASeller
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
 *  # Delete a Seller
 *  delete:
 *      description: This endpoint allows you to delete your seller account, as identified by the sellerId.
 *      summary: Delete your Seller Account.
 *      tags: [Seller]
 *      operationId: deleteASeller
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
 *  # Update a Seller
 *  patch:
 *      description: This endpointallows you to update your seller account, as identified by the sellerId.
 *      summary: Update your Seller Account.
 *      tags: [Seller]
 *      operationId: updateASeller
 *      requestBody:
 *          $ref: '#components/requestBodies/SellerUpdate'
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