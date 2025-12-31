package in.abhiram.food_delivery.service;

import java.time.LocalDateTime;
import java.util.List;

import in.abhiram.food_delivery.request.OrderRequest;
import in.abhiram.food_delivery.request.PaymentVerificationRequest;
import in.abhiram.food_delivery.response.OrderResponse;
import in.abhiram.food_delivery.response.PaymentOrderResponse;

public interface OrderService {
    
    OrderResponse createOrder(OrderRequest orderRequest);
    
    PaymentOrderResponse createPaymentOrder(String orderId);
    
    OrderResponse verifyPayment(PaymentVerificationRequest request);
    
    OrderResponse getOrderById(String orderId);
    
    List<OrderResponse> getAllOrders();
    
    List<OrderResponse> getOrdersByUserId();
    
    List<OrderResponse> getOrdersByStatus(String status);
    
    OrderResponse updateOrderStatus(String orderId, String status);
    
    OrderResponse cancelOrder(String orderId, String cancellationReason);
    
    OrderResponse updateTracking(String orderId, LocalDateTime deliveryTime, String trackingInfo);
    
    void deleteOrder(String orderId);
}
