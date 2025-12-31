package in.abhiram.food_delivery.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import in.abhiram.food_delivery.entity.CartEntity;
import in.abhiram.food_delivery.entity.FoodEntity;
import in.abhiram.food_delivery.entity.OrderEntity;
import in.abhiram.food_delivery.entity.OrderItem;
import in.abhiram.food_delivery.repository.CartRepository;
import in.abhiram.food_delivery.repository.FoodRepository;
import in.abhiram.food_delivery.repository.OrderRepository;
import in.abhiram.food_delivery.request.OrderRequest;
import in.abhiram.food_delivery.request.PaymentVerificationRequest;
import in.abhiram.food_delivery.response.OrderResponse;
import in.abhiram.food_delivery.response.PaymentOrderResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImplementation implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final FoodRepository foodRepository;
    private final UserService userService;
    private final RazorpayClient razorpayClient;

    @Value("${razorpay.key_id}")
    private String razorpayKeyId;

    @Value("${razorpay.key_secret}")
    private String razorpayKeySecret;

    @Override
    public OrderResponse createOrder(OrderRequest orderRequest) {
        String loggedInUserId = userService.FindByUserId(userService);
        
        // Get user's cart
        CartEntity cart = cartRepository.findByUserId(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Cart is empty. Cannot create order."));
        
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty. Cannot create order.");
        }
        
        // Create order items from cart
        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0.0;
        
        for (String foodId : cart.getItems().keySet()) {
            FoodEntity food = foodRepository.findById(foodId)
                    .orElseThrow(() -> new RuntimeException("Food not found with id: " + foodId));
            
            int quantity = cart.getItems().get(foodId);
            double itemTotal = food.getPrice() * quantity;
            totalAmount += itemTotal;
            
            OrderItem orderItem = new OrderItem();
            orderItem.setId(food.getId());
            orderItem.setFoodId(food.getId());
            orderItem.setName(food.getName());
            orderItem.setDescription(food.getDescription());
            orderItem.setCatogory(food.getCategory());
            orderItem.setImageUrl(food.getImageUrl());
            orderItem.setQuantity(quantity);
            orderItem.setTotalPrice(itemTotal);
            orderItem.setStatus("PENDING");
            
            orderItems.add(orderItem);
        }
        
        // Create order entity
        OrderEntity order = OrderEntity.builder()
                .userId(loggedInUserId)
                .userAddress(orderRequest.getUserAddress())
                .phoneNumber(orderRequest.getPhoneNumber())
                .email(orderRequest.getEmail())
                .orderItems(orderItems)
                .totalAmount(totalAmount)
                .paymentStatus("PENDING")
                .orderStatus("CREATED")
                .build();
        
        OrderEntity savedOrder = orderRepository.save(order);
        
        // Don't clear cart yet - wait for payment
        
        return convertToOrderResponse(savedOrder);
    }

    @Override
    public PaymentOrderResponse createPaymentOrder(String orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        
        if (!"PENDING".equals(order.getPaymentStatus())) {
            throw new RuntimeException("Payment already processed for this order");
        }
        
        try {
            // Create Razorpay order
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", (int)(order.getTotalAmount() * 100)); // Amount in paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", orderId);
            
            Order razorpayOrder = razorpayClient.orders.create(orderRequest);
            
            // Update order with razorpay order ID
            order.setRazorpayOrderId(razorpayOrder.get("id"));
            orderRepository.save(order);
            
            return PaymentOrderResponse.builder()
                    .orderId(orderId)
                    .razorpayOrderId(razorpayOrder.get("id"))
                    .amount(order.getTotalAmount())
                    .currency("INR")
                    .keyId(razorpayKeyId)
                    .build();
                    
        } catch (RazorpayException e) {
            throw new RuntimeException("Failed to create Razorpay order: " + e.getMessage());
        }
    }

    @Override
    public OrderResponse verifyPayment(PaymentVerificationRequest request) {
        OrderEntity order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));
        
        // Verify signature
        String signature = request.getRazorpaySignature();
        String data = request.getRazorpayOrderId() + "|" + request.getRazorpayPaymentId();
        
        try {
            String generatedSignature = hmacSha256(data, razorpayKeySecret);
            
            if (!generatedSignature.equals(signature)) {
                order.setPaymentStatus("FAILED");
                order.setOrderStatus("CANCELLED");
                orderRepository.save(order);
                throw new RuntimeException("Payment verification failed");
            }
            
            // Payment successful
            order.setPaymentStatus("COMPLETED");
            order.setOrderStatus("CONFIRMED");
            order.setRazorpaySignature(signature);
            
            // Update all order items status
            order.getOrderItems().forEach(item -> item.setStatus("CONFIRMED"));
            
            OrderEntity savedOrder = orderRepository.save(order);
            
            // Clear cart after successful payment
            cartRepository.deleteByUserId(order.getUserId());
            
            return convertToOrderResponse(savedOrder);
            
        } catch (Exception e) {
            throw new RuntimeException("Payment verification failed: " + e.getMessage());
        }
    }

    @Override
    public OrderResponse getOrderById(String orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        return convertToOrderResponse(order);
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        List<OrderEntity> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::convertToOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getOrdersByUserId() {
        String loggedInUserId = userService.FindByUserId(userService);
        List<OrderEntity> orders = orderRepository.findByUserId(loggedInUserId);
        return orders.stream()
                .map(this::convertToOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getOrdersByStatus(String status) {
        List<OrderEntity> orders = orderRepository.findByOrderStatus(status);
        return orders.stream()
                .map(this::convertToOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse updateOrderStatus(String orderId, String status) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        
        order.setOrderStatus(status);
        
        // Update all order items status as well
        order.getOrderItems().forEach(item -> item.setStatus(status));
        
        OrderEntity updatedOrder = orderRepository.save(order);
        return convertToOrderResponse(updatedOrder);
    }

    @Override
    public void deleteOrder(String orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new RuntimeException("Order not found with id: " + orderId);
        }
        orderRepository.deleteById(orderId);
    }

    @Override
    public OrderResponse cancelOrder(String orderId, String cancellationReason) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        
        // Only allow cancellation of CREATED or CONFIRMED orders
        if (!order.getOrderStatus().equals("CREATED") && !order.getOrderStatus().equals("CONFIRMED")) {
            throw new RuntimeException("Cannot cancel order with status: " + order.getOrderStatus());
        }
        
        order.setOrderStatus("CANCELLED");
        order.setCancellationReason(cancellationReason);
        
        // Update all order items status
        order.getOrderItems().forEach(item -> item.setStatus("CANCELLED"));
        
        // Note: In production, you would initiate refund here if payment was completed
        if ("COMPLETED".equals(order.getPaymentStatus())) {
            // Initiate refund via Razorpay
            // razorpayClient.payments.refund(paymentId, amount);
            order.setPaymentStatus("REFUND_INITIATED");
        }
        
        OrderEntity updatedOrder = orderRepository.save(order);
        return convertToOrderResponse(updatedOrder);
    }

    @Override
    public OrderResponse updateTracking(String orderId, java.time.LocalDateTime deliveryTime, String trackingInfo) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        
        if (deliveryTime != null) {
            order.setDeliveryTime(deliveryTime);
        }
        if (trackingInfo != null) {
            order.setTrackingInfo(trackingInfo);
        }
        
        OrderEntity updatedOrder = orderRepository.save(order);
        return convertToOrderResponse(updatedOrder);
    }

    private String hmacSha256(String data, String secret) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
        mac.init(secretKeySpec);
        byte[] hash = mac.doFinal(data.getBytes());
        
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

    private OrderResponse convertToOrderResponse(OrderEntity order) {
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .userAddress(order.getUserAddress())
                .phoneNumber(order.getPhoneNumber())
                .email(order.getEmail())
                .orderItems(order.getOrderItems())
                .totalAmount(order.getTotalAmount())
                .paymentStatus(order.getPaymentStatus())
                .orderStatus(order.getOrderStatus())
                .razorpayOrderId(order.getRazorpayOrderId())
                .razorpaySignature(order.getRazorpaySignature())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .deliveryTime(order.getDeliveryTime())
                .trackingInfo(order.getTrackingInfo())
                .cancellationReason(order.getCancellationReason())
                .build();
    }
}
