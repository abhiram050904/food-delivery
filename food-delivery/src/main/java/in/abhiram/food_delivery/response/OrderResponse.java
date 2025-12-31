package in.abhiram.food_delivery.response;

import java.time.LocalDateTime;
import java.util.List;

import in.abhiram.food_delivery.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {
    private String id;
    private String userId;
    private double totalAmount;
    private String userAddress;
    private String phoneNumber;
    private String email;
    private List<OrderItem> orderItems;
    private String paymentStatus;
    private String orderStatus;
    private String razorpayOrderId;
    private String razorpaySignature;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deliveryTime;
    private String trackingInfo;
    private String cancellationReason;
}
