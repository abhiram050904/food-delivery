package in.abhiram.food_delivery.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import in.abhiram.food_delivery.request.OrderRequest;
import in.abhiram.food_delivery.request.PaymentVerificationRequest;
import in.abhiram.food_delivery.response.OrderResponse;
import in.abhiram.food_delivery.response.PaymentOrderResponse;
import in.abhiram.food_delivery.service.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/orders")
@AllArgsConstructor
@CrossOrigin("*")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrder(@RequestBody OrderRequest orderRequest) {
        log.info("[INCOMING REQUEST] POST /orders - Creating new order");
        log.info("[REQUEST] Address: {}, Phone: {}, Email: {}", 
                orderRequest.getUserAddress(), orderRequest.getPhoneNumber(), orderRequest.getEmail());
        
        OrderResponse orderResponse = orderService.createOrder(orderRequest);
        
        log.info("[RESPONSE] Successfully created order with ID: {}", orderResponse.getId());
        log.info("[OUTGOING RESPONSE] POST /orders - Completed successfully\n");
        
        return orderResponse;
    }

    @PostMapping("/{orderId}/payment")
    public PaymentOrderResponse createPaymentOrder(@PathVariable String orderId) {
        log.info("[INCOMING REQUEST] POST /orders/{}/payment - Creating Razorpay payment order", orderId);
        
        PaymentOrderResponse paymentOrder = orderService.createPaymentOrder(orderId);
        
        log.info("[RESPONSE] Razorpay order created: {}", paymentOrder.getRazorpayOrderId());
        log.info("[OUTGOING RESPONSE] POST /orders/{}/payment - Completed successfully\n", orderId);
        
        return paymentOrder;
    }

    @PostMapping("/payment/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
        log.info("[INCOMING REQUEST] POST /orders/payment/verify - Verifying payment");
        log.info("[REQUEST] Order ID: {}, Razorpay Order ID: {}", 
                request.getOrderId(), request.getRazorpayOrderId());
        
        OrderResponse orderResponse = orderService.verifyPayment(request);
        
        log.info("[RESPONSE] Payment verified successfully for order: {}", orderResponse.getId());
        log.info("[OUTGOING RESPONSE] POST /orders/payment/verify - Completed successfully\n");
        
        return orderResponse;
    }

    @GetMapping("/{orderId}")
    public OrderResponse getOrderById(@PathVariable String orderId) {
        log.info("[INCOMING REQUEST] GET /orders/{} - Fetching order by ID", orderId);
        
        OrderResponse orderResponse = orderService.getOrderById(orderId);
        
        log.info("[RESPONSE] Retrieved order with {} items", orderResponse.getOrderItems().size());
        log.info("[OUTGOING RESPONSE] GET /orders/{} - Completed successfully\n", orderId);
        
        return orderResponse;
    }

    @GetMapping
    public List<OrderResponse> getAllOrders() {
        log.info("[INCOMING REQUEST] GET /orders - Fetching all orders");
        
        List<OrderResponse> orders = orderService.getAllOrders();
        
        log.info("[RESPONSE] Retrieved {} orders", orders.size());
        log.info("[OUTGOING RESPONSE] GET /orders - Completed successfully\n");
        
        return orders;
    }

    @GetMapping("/user")
    public List<OrderResponse> getUserOrders() {
        log.info("[INCOMING REQUEST] GET /orders/user - Fetching user's orders");
        
        List<OrderResponse> orders = orderService.getOrdersByUserId();
        
        log.info("[RESPONSE] Retrieved {} orders for user", orders.size());
        log.info("[OUTGOING RESPONSE] GET /orders/user - Completed successfully\n");
        
        return orders;
    }

    @GetMapping("/status/{status}")
    public List<OrderResponse> getOrdersByStatus(@PathVariable String status) {
        log.info("[INCOMING REQUEST] GET /orders/status/{} - Fetching orders by status", status);
        
        List<OrderResponse> orders = orderService.getOrdersByStatus(status);
        
        log.info("[RESPONSE] Retrieved {} orders with status: {}", orders.size(), status);
        log.info("[OUTGOING RESPONSE] GET /orders/status/{} - Completed successfully\n", status);
        
        return orders;
    }

    @PutMapping("/{orderId}/status")
    public OrderResponse updateOrderStatus(@PathVariable String orderId, 
                                          @RequestParam String status) {
        log.info("[INCOMING REQUEST] PUT /orders/{}/status - Updating order status to: {}", orderId, status);
        
        OrderResponse orderResponse = orderService.updateOrderStatus(orderId, status);
        
        log.info("[RESPONSE] Successfully updated order status");
        log.info("[OUTGOING RESPONSE] PUT /orders/{}/status - Completed successfully\n", orderId);
        
        return orderResponse;
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String orderId) {
        log.info("[INCOMING REQUEST] DELETE /orders/{} - Deleting order", orderId);
        
        orderService.deleteOrder(orderId);
        
        log.info("[RESPONSE] Successfully deleted order");
        log.info("[OUTGOING RESPONSE] DELETE /orders/{} - Completed successfully\n", orderId);
    }

    @PostMapping("/{orderId}/cancel")
    public OrderResponse cancelOrder(@PathVariable String orderId, 
                                    @RequestParam(required = false) String reason) {
        log.info("[INCOMING REQUEST] POST /orders/{}/cancel - Cancelling order", orderId);
        log.info("[REQUEST] Cancellation reason: {}", reason);
        
        OrderResponse orderResponse = orderService.cancelOrder(orderId, reason);
        
        log.info("[RESPONSE] Successfully cancelled order");
        log.info("[OUTGOING RESPONSE] POST /orders/{}/cancel - Completed successfully\n", orderId);
        
        return orderResponse;
    }

    @PutMapping("/{orderId}/tracking")
    public OrderResponse updateTracking(@PathVariable String orderId,
                                       @RequestParam(required = false) String deliveryTime,
                                       @RequestParam(required = false) String trackingInfo) {
        log.info("[INCOMING REQUEST] PUT /orders/{}/tracking - Updating tracking info", orderId);
        
        java.time.LocalDateTime parsedDeliveryTime = null;
        if (deliveryTime != null) {
            parsedDeliveryTime = java.time.LocalDateTime.parse(deliveryTime);
        }
        
        OrderResponse orderResponse = orderService.updateTracking(orderId, parsedDeliveryTime, trackingInfo);
        
        log.info("[RESPONSE] Successfully updated tracking info");
        log.info("[OUTGOING RESPONSE] PUT /orders/{}/tracking - Completed successfully\n", orderId);
        
        return orderResponse;
    }
}
