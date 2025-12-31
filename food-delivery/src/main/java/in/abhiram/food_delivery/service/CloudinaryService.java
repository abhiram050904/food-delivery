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
    public FoodResponse updateFood(String foodId, FoodRequest foodRequest, MultipartFile file) {
        log.info("[SERVICE] updateFood() - Updating food item with ID: {}", foodId);
        
        FoodEntity foodEntity = foodRepository.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food item not found with ID: " + foodId));
        
        log.info("[SERVICE] Updating food details");
        foodEntity.setName(foodRequest.getName());
        foodEntity.setDescription(foodRequest.getDescription());
        foodEntity.setPrice(foodRequest.getPrice());
        foodEntity.setCategory(foodRequest.getCategory());
        
        // Update image if new file provided
        if (file != null && !file.isEmpty()) {
            log.info("[SERVICE] New image provided, uploading to Cloudinary");
            String imageUrl = uploadFile(file);
            foodEntity.setImageUrl(imageUrl);
        }
        
        log.info("[SERVICE] Saving updated food entity");
        foodEntity = foodRepository.save(foodEntity);
        log.info("[SERVICE] updateFood() - Completed successfully");
        
        return convertToFoodResponse(foodEntity);
    }

    @Override
    public void deleteFood(String foodId) {
        if (!foodRepository.existsById(foodId)) {
            return;
        }
        foodRepository.deleteById(foodId);
    }

    @Override
    public List<FoodResponse> searchFoods(String query) {
        log.info("[SERVICE] searchFoods() - Searching for foods with query: {}", query);
        
        List<FoodEntity> foodEntities = foodRepository.findByNameContainingIgnoreCase(query);
        
        log.info("[SERVICE] Found {} matching foods", foodEntities.size());
        return foodEntities.stream()
                .map(this::convertToFoodResponse)
                .toList();
    }

    @Override
    public List<FoodResponse> filterFoods(String category, Double minPrice, Double maxPrice) {
        log.info("[SERVICE] filterFoods() - Filtering foods: category={}, minPrice={}, maxPrice={}", 
                category, minPrice, maxPrice);
        
        List<FoodEntity> foodEntities;
        
        if (category != null && minPrice != null && maxPrice != null) {
            foodEntities = foodRepository.findByCategoryAndPriceRange(category, minPrice, maxPrice);
        } else if (category != null) {
            foodEntities = foodRepository.findByCategory(category);
        } else if (minPrice != null && maxPrice != null) {
            foodEntities = foodRepository.findByPriceBetween(minPrice, maxPrice);
        } else {
            foodEntities = foodRepository.findAll();
        }
        
        log.info("[SERVICE] Found {} matching foods", foodEntities.size());
        return foodEntities.stream()
                .map(this::convertToFoodResponse)
                .toList();
    }
}