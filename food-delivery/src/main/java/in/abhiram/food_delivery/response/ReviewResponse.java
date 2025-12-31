package in.abhiram.food_delivery.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewResponse {
    private String id;
    private String foodId;
    private String userId;
    private String username;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;
}
