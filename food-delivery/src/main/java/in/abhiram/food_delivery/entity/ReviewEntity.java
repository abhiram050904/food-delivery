package in.abhiram.food_delivery.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "reviews")
public class ReviewEntity {
    
    @Id
    private String id;
    private String foodId;
    private String userId;
    private String username;
    private int rating; // 1-5
    private String comment;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
}
