package in.abhiram.food_delivery.service;

import org.springframework.web.multipart.MultipartFile;

import in.abhiram.food_delivery.request.FoodRequest;
import in.abhiram.food_delivery.response.FoodResponse;

public interface FoodService {
    
    String uploadFile(MultipartFile file);

    FoodResponse addFood(FoodRequest foodRequest, MultipartFile file);
}
