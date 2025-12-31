package in.abhiram.food_delivery.service;

import java.util.List;
import java.util.Map;

import in.abhiram.food_delivery.request.ReviewRequest;
import in.abhiram.food_delivery.response.ReviewResponse;

public interface ReviewService {
    ReviewResponse addReview(String foodId, String username, ReviewRequest reviewRequest);
    List<ReviewResponse> getReviewsByFood(String foodId);
    Map<String, Object> getFoodRating(String foodId);
    void deleteReview(String reviewId, String username);
}
