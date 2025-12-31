package in.abhiram.food_delivery.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentVerificationRequest {
    private String orderId;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
}
