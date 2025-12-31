package in.abhiram.food_delivery.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "orders")
public class OrderEntity {

    @Id
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
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    private LocalDateTime deliveryTime;
    private String trackingInfo;
    private String cancellationReason;
    
}
