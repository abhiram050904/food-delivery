package in.abhiram.food_delivery.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentOrderResponse {
    private String orderId;
    private String razorpayOrderId;
    private double amount;
    private String currency;
    private String keyId;
}
