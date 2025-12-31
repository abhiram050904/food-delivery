package in.abhiram.food_delivery.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import in.abhiram.food_delivery.request.FoodRequest;
import in.abhiram.food_delivery.response.FoodResponse;

public interface FoodService {
    
    String uploadFile(MultipartFile file);

    FoodResponse addFood(FoodRequest foodRequest, MultipartFile file);

    List<FoodResponse> getAllFoods();

    FoodResponse readFood(String foodId);
    
    FoodResponse updateFood(String foodId, FoodRequest foodRequest, MultipartFile file);

    void deleteFood(String foodId);
    
    List<FoodResponse> searchFoods(String query);
    
    List<FoodResponse> filterFoods(String category, Double minPrice, Double maxPrice);
}
