package in.abhiram.food_delivery.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import in.abhiram.food_delivery.entity.FoodEntity;
import in.abhiram.food_delivery.repository.FoodRepository;
import in.abhiram.food_delivery.request.FoodRequest;
import in.abhiram.food_delivery.response.FoodResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@AllArgsConstructor
public class CloudinaryService implements FoodService {

    private final Cloudinary cloudinary;
    private final FoodRepository foodRepository;

    @Override
    public String uploadFile(MultipartFile file) {
        log.info("[SERVICE] uploadFile() - Starting file upload to Cloudinary");
        log.info("[SERVICE] File details: name={}, size={} bytes, contentType={}", 
            file.getOriginalFilename(), file.getSize(), file.getContentType());
        
        try {
            // Generate a unique public ID for the uploaded file
            String publicId = UUID.randomUUID().toString();
            log.debug("[SERVICE] Generated public ID: {}", publicId);
            
            // Upload the file to Cloudinary
            log.info("[SERVICE] Uploading to Cloudinary...");
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
            String imageUrl = (String) uploadResult.get("secure_url");
            log.info("[SERVICE] File uploaded successfully. URL: {}", imageUrl);
            log.info("[SERVICE] uploadFile() - Completed successfully");
            return imageUrl;
            
        } catch (IOException e) {
            log.error("[SERVICE ERROR] Failed to upload file to Cloudinary: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to upload file to Cloudinary: " + e.getMessage(), e);
        }
    }

    @Override
    public FoodResponse addFood(FoodRequest foodRequest, MultipartFile file) {
        log.info("[SERVICE] addFood() - Starting to add new food item");
        log.info("[SERVICE] Food request: name={}, category={}, price={}, description={}", 
            foodRequest.getName(), foodRequest.getCategory(), foodRequest.getPrice(), foodRequest.getDescription());
        
        log.info("[SERVICE] Step 1: Uploading file to Cloudinary");
        String imageUrl = uploadFile(file);
        
        log.info("[SERVICE] Step 2: Converting request to entity");
        FoodEntity foodEntity = covertTOEntity(foodRequest, imageUrl);
        log.debug("[SERVICE] Entity created with imageUrl: {}", imageUrl);

        log.info("[SERVICE] Step 3: Saving entity to database");
        foodEntity = foodRepository.save(foodEntity);
        log.info("[SERVICE] Entity saved successfully with ID: {}", foodEntity.getId());
 
        log.info("[SERVICE] Step 4: Converting entity to response");
        FoodResponse response = convertToFoodResponse(foodEntity);
        log.info("[SERVICE] addFood() - Completed successfully. Returning response");
        return response;
    }


    private FoodEntity covertTOEntity(FoodRequest foodRequest,String imageUrl) {
        log.debug("[SERVICE] Converting FoodRequest to FoodEntity");
        FoodEntity entity = FoodEntity.builder()
        .name(foodRequest.getName())
        .description(foodRequest.getDescription())
        .price(foodRequest.getPrice())
        .category(foodRequest.getCategory())
        .imageUrl(imageUrl)
        .build();
        log.debug("[SERVICE] Conversion to entity completed");
        return entity;
    }

    private FoodResponse convertToFoodResponse(FoodEntity foodEntity) {
        log.debug("[SERVICE] Converting FoodEntity to FoodResponse");
        FoodResponse response = FoodResponse.builder()
                .id(foodEntity.getId())
                .name(foodEntity.getName())
                .description(foodEntity.getDescription())
                .price(foodEntity.getPrice())
                .category(foodEntity.getCategory())
                .imageUrl(foodEntity.getImageUrl())
                .build();
        log.debug("[SERVICE] Conversion to response completed");
        return response;
    }

    @Override
    public List<FoodResponse> getAllFoods() {
        
        List<FoodEntity> foodEntities = foodRepository.findAll();
        
        List<FoodResponse> foodResponses = foodEntities.stream()
                .map(this::convertToFoodResponse)
                .toList();
        
        return foodResponses;
    }

    @Override
    public FoodResponse readFood(String foodId) {
        FoodEntity foodEntity = foodRepository.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food item not found with ID: " + foodId));
        
        return convertToFoodResponse(foodEntity);
    }

    @Override
    public void deleteFood(String foodId) {
        if (!foodRepository.existsById(foodId)) {
            return;
        }
        foodRepository.deleteById(foodId);
    }
}