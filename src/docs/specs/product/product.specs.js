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

/**
 * # Query Products
 * @openapi
 * /api/products:
 *  parameters:
 *      - name: cursor
 *        in: query
 *        description: The cursor to the next set of items to be fetched from the database.
 *        schema:
 *          type: string
 *      - name: search
 *        in: query
 *        description: The product you wish to search for.
 *        schema:
 *          type: string
 *      - name: category
 *        in: query
 *        description: The category of products you wish to search from.
 *        schema:
 *          type: string
 * 
 * # View all Products
 *  get:
 *      description: This endpoint retrieves all the listed products, supports filtering and pagination.
 *      summary: Get all Products.
 *      tags: [Product]
 *      operationId: getAllProducts
 *      responses:
 *          '200':
 *              $ref: '#components/schemas/Success'
 *          '400':
 *              $ref: '#components/schemas/BadRequest'
 *          '401':
 *              $ref: '#components/schemas/Unauthorized'
 *          '403':
 *              $ref: '#components/schemas/Forbidden'
 *          '404':
 *              $ref: '#components/schemas/NotFound'
 *          '500':
 *              $ref: '#components/schemas/InternalServerError'
 * 
 * # View a Product
 * /api/products/{productId}:
 *  parameters:
 *      - name: productId
 *        in: path
 *        required: true
 *        description: The product identifier, as productId
 *        schema:
 *          type: string
 *  get:
 *      description: This endpoint retrieves a listed product, identifed by the productId.
 *      summary: View a Product.
 *      tags: [Product]
 *      operationId: viewAProduct
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

/**
 * # Shopping Cart
 * @openapi
 * # View Shopping Cart
 * /api/cart/view:
 *  get:
 *      description: This endpoint allows you to view your shopping cart.
 *      summary: View your shopping Cart.
 *      tags: [Product, Cart]
 *      operationId: viewShoppingCart
 *      responses:
 *          '200':
 *              $ref: '#components/responses/Success'
 *          '401':
 *              $ref: '#components/responses/Unauthorized'
 *          '403':
 *              $ref: '#components/responses/Forbidden'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 * # Add item to shopping Cart
 * /api/cart/add-item/{productId}:
 *  parameters:
 *      - name: productId
 *        in: path
 *        required: true
 *        description: The product to be added to your shopping cart, identified as productId.
 *        schema:
 *          type: string
 *  post:
 *      description: This endpoint allows you to add a Product to your shopping Cart.
 *      summary: Add to Cart.
 *      tags: [Product, Cart]
 *      operationId: addToCart
 *      responses:
 *          '201':
 *              $ref: '#components/responses/Success'
 *          '401':
 *              $ref: '#components/responses/Unauthorized'
 *          '403':
 *              $ref: '#components/responses/Forbidden'
 *          '500':
 *              $ref: '#components/responses/InternalServerError'
 * 
 * # Remove item from shopping Cart
 * /api/cart/remove-item/{productId}:
 *  parameters:
 *      - name: productId
 *        in: path
 *        required: true
 *        description: The product to be added to your shopping cart, identified as productId.
 *        schema:
 *          type: string
 *  delete:
 *      description: This endpoint allows you to remove a Product from your shopping Cart.
 *      summary: Remove item from Cart.
 *      operationId: removeFromCart
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