package in.abhiram.food_delivery.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.abhiram.food_delivery.request.ReviewRequest;
import in.abhiram.food_delivery.response.ReviewResponse;
import in.abhiram.food_delivery.service.ReviewService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/foods")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/{foodId}/reviews")
    public ResponseEntity<ReviewResponse> addReview(
            @PathVariable String foodId,
            @RequestBody ReviewRequest reviewRequest,
            Principal principal) {
        ReviewResponse response = reviewService.addReview(foodId, principal.getName(), reviewRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{foodId}/reviews")
    public ResponseEntity<List<ReviewResponse>> getReviewsByFood(@PathVariable String foodId) {
        List<ReviewResponse> reviews = reviewService.getReviewsByFood(foodId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/{foodId}/rating")
    public ResponseEntity<Map<String, Object>> getFoodRating(@PathVariable String foodId) {
        Map<String, Object> ratingInfo = reviewService.getFoodRating(foodId);
        return ResponseEntity.ok(ratingInfo);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable String reviewId, Principal principal) {
        reviewService.deleteReview(reviewId, principal.getName());
        return ResponseEntity.ok("Review deleted successfully");
    }
}
