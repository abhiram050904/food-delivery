# ORDER & PAYMENT FLOW DOCUMENTATION

## Complete Backend Implementation ✅

### What's Implemented on Backend:

1. **Order Management**
   - Create order from cart
   - Get orders (all, by user, by status, by ID)
   - Update order status
   - Delete order

2. **Razorpay Integration**
   - Create Razorpay payment order
   - Payment signature verification (HMAC SHA256)
   - Automatic cart clearing after successful payment
   - Payment status tracking

3. **Security**
   - JWT authentication for all endpoints
   - Payment signature verification
   - User-specific order access

---

## Payment Flow (3-Step Process)

### Step 1: Create Order (Backend)
```http
POST /api/orders
Headers: Authorization: Bearer <JWT_TOKEN>
Body: {
  "userAddress": "123 Main St",
  "phoneNumber": "+1-555-1234",
  "email": "user@example.com"
}

Response: {
  "id": "order_abc123",
  "totalAmount": 25.98,
  "orderStatus": "CREATED",
  "paymentStatus": "PENDING"
}
```

### Step 2: Create Razorpay Payment Order (Backend)
```http
POST /api/orders/{orderId}/payment
Headers: Authorization: Bearer <JWT_TOKEN>

Response: {
  "orderId": "order_abc123",
  "razorpayOrderId": "order_Razorpay123",
  "amount": 25.98,
  "currency": "INR",
  "keyId": "rzp_test_xxxxx"
}
```

### Step 3: Payment & Verification

**Frontend needs to:**
1. Load Razorpay checkout with the response from Step 2
2. User completes payment in Razorpay UI
3. On success, Razorpay returns payment details
4. Send to backend for verification

**Backend verification:**
```http
POST /api/orders/payment/verify
Headers: Authorization: Bearer <JWT_TOKEN>
Body: {
  "orderId": "order_abc123",
  "razorpayOrderId": "order_Razorpay123",
  "razorpayPaymentId": "pay_Razorpay456",
  "razorpaySignature": "signature_hash"
}

Response: {
  "id": "order_abc123",
  "orderStatus": "CONFIRMED",
  "paymentStatus": "COMPLETED"
}
```

---

## Frontend Implementation (What You Need to Do)

### 1. Install Razorpay SDK
```bash
npm install razorpay
```

### 2. Frontend Checkout Flow
```javascript
// Step 1: Create order
const orderResponse = await fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userAddress: address,
    phoneNumber: phone,
    email: email
  })
});
const order = await orderResponse.json();

// Step 2: Get Razorpay order
const paymentResponse = await fetch(`/api/orders/${order.id}/payment`, {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` }
});
const paymentOrder = await paymentResponse.json();

// Step 3: Open Razorpay Checkout
const options = {
  key: paymentOrder.keyId,
  amount: paymentOrder.amount * 100, // paise
  currency: paymentOrder.currency,
  name: 'Food Delivery',
  description: 'Order Payment',
  order_id: paymentOrder.razorpayOrderId,
  handler: async function (response) {
    // Step 4: Verify payment
    const verifyResponse = await fetch('/api/orders/payment/verify', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderId: order.id,
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature
      })
    });
    
    if (verifyResponse.ok) {
      alert('Payment successful!');
      // Redirect to order confirmation page
    }
  }
};

const rzp = new Razorpay(options);
rzp.open();
```

---

## Environment Variables Required

Add to `.env` file:
```properties
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Existing
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Get Razorpay credentials:**
1. Sign up at https://razorpay.com
2. Go to Settings > API Keys
3. Generate Test/Live keys
4. Add to `.env` file

---

## All Available Endpoints

### Orders
- `POST /api/orders` - Create order from cart
- `GET /api/orders` - Get all orders
- `GET /api/orders/user` - Get logged-in user's orders
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders/status/{status}` - Get orders by status
- `PUT /api/orders/{id}/status?status=DELIVERED` - Update order status
- `DELETE /api/orders/{id}` - Delete order

### Payments
- `POST /api/orders/{id}/payment` - Create Razorpay payment order
- `POST /api/orders/payment/verify` - Verify payment signature

### Cart
- `POST /api/cart/add` - Add item to cart
- `GET /api/cart` - Get user's cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/{foodId}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

---

## Order Status Flow

1. **CREATED** - Order created, payment pending
2. **CONFIRMED** - Payment successful
3. **PREPARING** - Restaurant preparing food
4. **OUT_FOR_DELIVERY** - On the way
5. **DELIVERED** - Completed
6. **CANCELLED** - Payment failed or cancelled

---

## Payment Status

- **PENDING** - Waiting for payment
- **COMPLETED** - Payment successful
- **FAILED** - Payment verification failed

---

## Testing Without Razorpay (Development)

For testing, you can temporarily skip payment by:
1. Creating order
2. Manually updating payment status via API
3. Or implement a "Cash on Delivery" option

---

## Summary

✅ **Backend handles:**
- Order creation
- Payment order generation
- Signature verification (security)
- Cart clearing
- Order management

🎨 **Frontend handles:**
- Razorpay checkout UI
- User interaction
- Passing payment details back to backend

This is the standard e-commerce flow used by major platforms!
