# Food Delivery Backend - Complete Features

## Overview
This document outlines all the features implemented in the food delivery backend system.

## 🔐 Authentication & Authorization

### User Roles
- **ROLE_USER**: Default role for registered users
- **ROLE_ADMIN**: Admin role for food management operations

### Endpoints
- `POST /users/register` - Register new user (default role: ROLE_USER)
- `POST /users/login` - Login and receive JWT token

### Admin Access
To create an admin user, manually set `role: "ROLE_ADMIN"` in the database for a user document.

---

## 🍕 Food Management

### Public Endpoints (No Authentication Required)
```http
GET /foods
GET /foods/{id}
GET /foods/search?q={query}
GET /foods/filter?category={category}&minPrice={min}&maxPrice={max}
GET /foods/{foodId}/reviews
GET /foods/{foodId}/rating
```

### Admin-Only Endpoints (Requires ROLE_ADMIN)
```http
POST /foods
PUT /foods/{id}
DELETE /foods/{id}
```

### Features
- **Add Food**: Upload food with image to Cloudinary
- **Update Food**: Update food details, optionally update image
- **Delete Food**: Remove food item
- **Search**: Search foods by name (case-insensitive)
- **Filter**: Filter by category, price range, or both

### Example: Add Food (Admin Only)
```bash
curl -X POST http://localhost:8080/foods \
  -H "Authorization: Bearer {admin_jwt_token}" \
  -F "food={\"name\":\"Margherita Pizza\",\"description\":\"Classic pizza\",\"price\":12.99,\"category\":\"Italian\"}" \
  -F "file=@pizza.jpg"
```

### Example: Search Foods
```bash
curl http://localhost:8080/foods/search?q=pizza
```

### Example: Filter Foods
```bash
curl "http://localhost:8080/foods/filter?category=Italian&minPrice=10&maxPrice=20"
```

---

## 🛒 Cart Management

All cart endpoints require authentication.

```http
POST /cart/add
GET /cart
PUT /cart/update
DELETE /cart/remove/{cartItemId}
DELETE /cart/clear
```

### Features
- Add items to cart
- View cart contents
- Update item quantities
- Remove individual items
- Clear entire cart

### Example: Add to Cart
```bash
curl -X POST http://localhost:8080/cart/add \
  -H "Authorization: Bearer {jwt_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "foodId": "food123",
    "quantity": 2
  }'
```

---

## 📦 Order Management

### User Endpoints (Authenticated)
```http
POST /orders
POST /orders/{orderId}/payment
POST /orders/payment/verify
GET /orders/user
GET /orders/{orderId}
POST /orders/{orderId}/cancel?reason={reason}
```

### Admin Endpoints
```http
GET /orders
GET /orders/status/{status}
PUT /orders/{orderId}/status?status={newStatus}
PUT /orders/{orderId}/tracking?deliveryTime={time}&trackingInfo={info}
DELETE /orders/{orderId}
```

### Order Statuses
- `CREATED` - Order created, awaiting payment
- `CONFIRMED` - Payment successful
- `PREPARING` - Restaurant is preparing the order
- `OUT_FOR_DELIVERY` - Order is being delivered
- `DELIVERED` - Order completed
- `CANCELLED` - Order cancelled

### Features
1. **Create Order**: Creates order from user's cart
2. **Payment Integration**: Razorpay payment gateway
3. **Payment Verification**: HMAC SHA256 signature verification
4. **Order Tracking**: Track delivery time and status
5. **Order Cancellation**: Users can cancel orders in CREATED/CONFIRMED status
6. **Auto Cart Clear**: Cart automatically clears after successful payment

### Payment Flow
1. **Create Order** - Creates order with PENDING payment status
2. **Create Payment Order** - Generates Razorpay order
3. **User Pays** - Frontend handles Razorpay payment UI
4. **Verify Payment** - Backend verifies signature and confirms order

### Example: Create Order
```bash
curl -X POST http://localhost:8080/orders \
  -H "Authorization: Bearer {jwt_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "userAddress": "123 Main St, City, State 12345",
    "phoneNumber": "+1234567890",
    "email": "user@example.com"
  }'
```

### Example: Cancel Order
```bash
curl -X POST "http://localhost:8080/orders/order123/cancel?reason=Changed my mind" \
  -H "Authorization: Bearer {jwt_token}"
```

### Example: Update Tracking (Admin)
```bash
curl -X PUT "http://localhost:8080/orders/order123/tracking?deliveryTime=2024-01-15T18:30:00&trackingInfo=Out for delivery, Driver: John" \
  -H "Authorization: Bearer {admin_jwt_token}"
```

---

## ⭐ Review & Rating System

### Endpoints
```http
POST /foods/{foodId}/reviews
GET /foods/{foodId}/reviews
GET /foods/{foodId}/rating
DELETE /foods/reviews/{reviewId}
```

### Features
- Users can review foods they've ordered (authenticated)
- Rating scale: 1-5 stars
- Average rating calculation
- Users can delete their own reviews
- Admins can delete any review

### Example: Add Review
```bash
curl -X POST http://localhost:8080/foods/food123/reviews \
  -H "Authorization: Bearer {jwt_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "comment": "Absolutely delicious! Highly recommend."
  }'
```

### Example: Get Food Rating
```bash
curl http://localhost:8080/foods/food123/rating
```

**Response:**
```json
{
  "averageRating": 4.5,
  "totalReviews": 24
}
```

---

## 🔍 Search & Filter Capabilities

### Search by Name
```http
GET /foods/search?q={query}
```
Searches food items by name (case-insensitive, partial match).

### Filter Options
```http
GET /foods/filter?category={category}&minPrice={min}&maxPrice={max}
```

**Parameters (all optional):**
- `category` - Filter by food category
- `minPrice` - Minimum price
- `maxPrice` - Maximum price

**Examples:**
```bash
# By category only
curl "http://localhost:8080/foods/filter?category=Italian"

# By price range only
curl "http://localhost:8080/foods/filter?minPrice=10&maxPrice=20"

# Combined filters
curl "http://localhost:8080/foods/filter?category=Italian&minPrice=10&maxPrice=20"
```

---

## 📊 Order Tracking Details

### Automatic Timestamps
- `createdAt` - Order creation timestamp (auto-generated)
- `updatedAt` - Last update timestamp (auto-updated)
- `deliveryTime` - Estimated/actual delivery time (admin-set)

### Tracking Information
The `trackingInfo` field can store:
- Current location
- Driver details
- Delivery notes
- Status updates

### Example Order Response with Tracking
```json
{
  "id": "order123",
  "userId": "user456",
  "totalAmount": 77.94,
  "orderStatus": "OUT_FOR_DELIVERY",
  "paymentStatus": "COMPLETED",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T12:45:00",
  "deliveryTime": "2024-01-15T13:30:00",
  "trackingInfo": "Driver: John Doe, Phone: +1234567890, Location: 2 blocks away",
  "orderItems": [...]
}
```

---

## 🛡️ Security Features

### JWT Authentication
- Token-based authentication
- Stateless session management
- Token contains username and role

### Role-Based Access Control
- Method-level security with `@PreAuthorize`
- Admin-only endpoints protected
- User-specific data isolation

### Password Security
- BCrypt password hashing
- Secure password storage

### CORS Configuration
- Configured for cross-origin requests
- Supports all standard HTTP methods

---

## 📝 Complete Endpoint Summary

### Total Endpoints: 35+

**Authentication (2)**
- Register, Login

**Foods (9)**
- CRUD operations (add, get all, get by id, update, delete)
- Search, Filter
- Reviews (2)

**Cart (5)**
- Add, Get, Update, Remove, Clear

**Orders (10)**
- Create, Payment flow (2), Get operations (4)
- Cancel, Update status, Update tracking

**Reviews (4)**
- Add review, Get reviews, Get rating, Delete review

---

## 🚀 Getting Started

### Prerequisites
1. MongoDB Atlas connection string in `application.properties`
2. Cloudinary credentials for image uploads
3. Razorpay API keys for payment processing

### Configuration
Update `application.properties`:
```properties
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>
cloudinary.cloud_name=your_cloud_name
cloudinary.api_key=your_api_key
cloudinary.api_secret=your_api_secret
razorpay.key_id=your_key_id
razorpay.key_secret=your_key_secret
```

### Creating Admin User
1. Register a user normally via `/users/register`
2. In MongoDB, update the user document:
   ```javascript
   db.users.updateOne(
     { username: "admin" },
     { $set: { role: "ROLE_ADMIN" } }
   )
   ```

---

## 🧪 Testing

### Test Admin Features
1. Create admin user as described above
2. Login to get admin JWT token
3. Use token to add/update/delete foods

### Test User Flow
1. Register user → Login → Browse foods
2. Add items to cart → Create order
3. Complete payment → View order history
4. Add reviews to ordered items

### Test Search & Filter
- Search: `/foods/search?q=pizza`
- Filter by category: `/foods/filter?category=Italian`
- Filter by price: `/foods/filter?minPrice=10&maxPrice=20`

---

## 📦 Collections in MongoDB

1. **users** - User accounts with roles
2. **foods** - Food items catalog
3. **carts** - User shopping carts
4. **orders** - Order records with payment info
5. **reviews** - Food reviews and ratings

---

## 🎯 Production Readiness

### Implemented ✅
- Role-based authorization
- Payment integration
- Order tracking
- Review system
- Search & filter
- Order cancellation
- Comprehensive logging
- Error handling

### Future Enhancements (Optional)
- Real-time order tracking with WebSocket
- Email notifications
- SMS notifications for order updates
- Analytics dashboard
- Promotional codes/discounts
- Multiple payment methods
- Restaurant management system
- Delivery partner integration

---

## 📞 Support

For issues or questions:
1. Check logs for detailed error messages
2. Verify all configuration properties are set
3. Ensure MongoDB connection is active
4. Verify JWT token is valid and not expired
5. Check user role for admin operations

---

**Backend is now production-ready with all essential features implemented!** 🎉
