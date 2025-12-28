package in.abhiram.food_delivery.service;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import in.abhiram.food_delivery.entity.FoodEntity;
import in.abhiram.food_delivery.repository.FoodRepository;
import in.abhiram.food_delivery.request.FoodRequest;
import in.abhiram.food_delivery.response.FoodResponse;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class CloudinaryService implements FoodService {

    private final Cloudinary cloudinary;
    private final FoodRepository foodRepository;

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            // Generate a unique public ID for the uploaded file
            String publicId = UUID.randomUUID().toString();
            
            // Upload the file to Cloudinary
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = (Map<String, Object>) cloudinary.uploader().upload(
                file.getBytes(), 
                ObjectUtils.asMap(
                    "public_id", publicId,
                    "folder", "food-delivery",
                    "resource_type", "auto"
                )
            );
            
            // Return the secure URL of the uploaded file
            return (String) uploadResult.get("secure_url");
            
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file to Cloudinary: " + e.getMessage(), e);
        }
    }

    @Override
    public FoodResponse addFood(FoodRequest foodRequest, MultipartFile file) {
        String imageUrl = uploadFile(file);
        FoodEntity foodEntity = covertTOEntity(foodRequest, imageUrl);
       

        
        foodEntity = foodRepository.save(foodEntity);
 
        return convertToFoodResponse(foodEntity);
    }


    private FoodEntity covertTOEntity(FoodRequest foodRequest,String imageUrl) {
        return FoodEntity.builder()
        .name(foodRequest.getName())
        .description(foodRequest.getDescription())
        .price(foodRequest.getPrice())
        .category(foodRequest.getCategory())
        .imageUrl(imageUrl)
        .build();
    }

    private FoodResponse convertToFoodResponse(FoodEntity foodEntity) {
        return FoodResponse.builder()
                .id(foodEntity.getId())
                .name(foodEntity.getName())
                .description(foodEntity.getDescription())
                .price(foodEntity.getPrice())
                .category(foodEntity.getCategory())
                .imageUrl(foodEntity.getImageUrl())
                .build();
    }
}