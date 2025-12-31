package in.abhiram.food_delivery.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import in.abhiram.food_delivery.entity.ReviewEntity;
import in.abhiram.food_delivery.repository.ReviewRepository;
import in.abhiram.food_delivery.request.ReviewRequest;
import in.abhiram.food_delivery.response.ReviewResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImplementation implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserService userService;

    @Override
    public ReviewResponse addReview(String foodId, String username, ReviewRequest reviewRequest) {
        var user = userService.getUserByUsername(username);
        
        ReviewEntity review = ReviewEntity.builder()
                .foodId(foodId)
                .userId(user.getId())
                .username(user.getUsername())
                .rating(reviewRequest.getRating())
                .comment(reviewRequest.getComment())
                .createdAt(LocalDateTime.now())
                .build();
        
        ReviewEntity savedReview = reviewRepository.save(review);
        
        return mapToResponse(savedReview);
    }

    @Override
    public List<ReviewResponse> getReviewsByFood(String foodId) {
        return reviewRepository.findByFoodId(foodId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getFoodRating(String foodId) {
        List<ReviewEntity> reviews = reviewRepository.findByFoodId(foodId);
        
        Map<String, Object> ratingInfo = new HashMap<>();
        
        if (reviews.isEmpty()) {
            ratingInfo.put("averageRating", 0.0);
            ratingInfo.put("totalReviews", 0);
        } else {
            double average = reviews.stream()
                    .mapToInt(ReviewEntity::getRating)
                    .average()
                    .orElse(0.0);
            
            ratingInfo.put("averageRating", Math.round(average * 10.0) / 10.0);
            ratingInfo.put("totalReviews", reviews.size());
        }
        
        return ratingInfo;
    }

    @Override
    public void deleteReview(String reviewId, String username) {
        ReviewEntity review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        
        var user = userService.getUserByUsername(username);
        
        if (!review.getUserId().equals(user.getId()) && !user.getRole().equals("ROLE_ADMIN")) {
            throw new RuntimeException("You can only delete your own reviews");
        }
        
        reviewRepository.deleteById(reviewId);
    }

    private ReviewResponse mapToResponse(ReviewEntity review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .foodId(review.getFoodId())
                .userId(review.getUserId())
                .username(review.getUsername())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
