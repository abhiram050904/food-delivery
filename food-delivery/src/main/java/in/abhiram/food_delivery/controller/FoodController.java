package in.abhiram.food_delivery.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import in.abhiram.food_delivery.request.FoodRequest;
import in.abhiram.food_delivery.response.FoodResponse;
import in.abhiram.food_delivery.service.FoodService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Slf4j
@RestController
@RequestMapping("/foods")
@AllArgsConstructor
@CrossOrigin("*")
public class FoodController {

    private final FoodService foodService;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public FoodResponse addFood(@RequestPart("food") String foodString,
            @RequestPart("file") MultipartFile file) {
        
                log.info("[INCOMING REQUEST] POST /foods - Adding new food item");
                log.info("[REQUEST] Food data: {}", foodString);
                log.info("[REQUEST] File name: {}, Size: {} bytes, Content Type: {}", 
                    file.getOriginalFilename(), file.getSize(), file.getContentType());

                ObjectMapper objectMapper = new ObjectMapper();
                FoodRequest foodRequest= null;
                try {
                    foodRequest = objectMapper.readValue(foodString, FoodRequest.class);
                    log.debug("[PARSE SUCCESS] Food request parsed: name={}, category={}, price={}", 
                        foodRequest.getName(), foodRequest.getCategory(), foodRequest.getPrice());
                } catch (Exception e) {
                    log.error("[PARSE ERROR] Failed to parse food data: {}", e.getMessage());
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid food data: " + e.getMessage());
                }

                log.info("[PROCESSING] Calling service layer to add food");
                FoodResponse foodResponse=foodService.addFood(foodRequest, file);
                
                log.info("[RESPONSE] Successfully added food with ID: {}", foodResponse.getId());
                log.info("[RESPONSE] Food details: {}", foodResponse);
                log.info("[OUTGOING RESPONSE] POST /foods - Completed successfully\n");
                
                return foodResponse;
    }

    @GetMapping
    public List<FoodResponse> getAllFoods() {
        log.info("[INCOMING REQUEST] GET /foods - Fetching all food items");
        
        List<FoodResponse> foodResponses = foodService.getAllFoods();
        
        log.info("[RESPONSE] Retrieved {} food items", foodResponses.size());
        log.info("[OUTGOING RESPONSE] GET /foods - Completed successfully\n");
        
        return foodResponses;
    }

    @GetMapping("/{foodId}")
    public FoodResponse getFoodById(@PathVariable String foodId) {
       
        FoodResponse foodResponse = foodService.readFood(foodId);
        return foodResponse;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{foodId}")
    public FoodResponse updateFood(@PathVariable String foodId,
                                   @RequestPart("food") String foodString,
                                   @RequestPart(value = "file", required = false) MultipartFile file) {
        
        log.info("[INCOMING REQUEST] PUT /foods/{} - Updating food item", foodId);
        log.info("[REQUEST] Food data: {}", foodString);
        if (file != null) {
            log.info("[REQUEST] New image provided: {}", file.getOriginalFilename());
        }
        
        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest foodRequest = null;
        try {
            foodRequest = objectMapper.readValue(foodString, FoodRequest.class);
        } catch (Exception e) {
            log.error("[PARSE ERROR] Failed to parse food data: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid food data: " + e.getMessage());
        }
        
        log.info("[PROCESSING] Calling service layer to update food");
        FoodResponse foodResponse = foodService.updateFood(foodId, foodRequest, file);
        
        log.info("[RESPONSE] Successfully updated food with ID: {}", foodResponse.getId());
        log.info("[OUTGOING RESPONSE] PUT /foods/{} - Completed successfully\n", foodId);
        
        return foodResponse;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{foodId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFood(@PathVariable String foodId) {
        foodService.deleteFood(foodId);
    }

    @GetMapping("/search")
    public List<FoodResponse> searchFoods(@RequestParam String q) {
        log.info("[INCOMING REQUEST] GET /foods/search?q={} - Searching for foods", q);
        
        List<FoodResponse> foodResponses = foodService.searchFoods(q);
        
        log.info("[RESPONSE] Found {} matching foods", foodResponses.size());
        log.info("[OUTGOING RESPONSE] GET /foods/search - Completed successfully\n");
        
        return foodResponses;
    }

    @GetMapping("/filter")
    public List<FoodResponse> filterFoods(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        
        log.info("[INCOMING REQUEST] GET /foods/filter - Filtering foods: category={}, minPrice={}, maxPrice={}", 
                category, minPrice, maxPrice);
        
        List<FoodResponse> foodResponses = foodService.filterFoods(category, minPrice, maxPrice);
        
        log.info("[RESPONSE] Found {} matching foods", foodResponses.size());
        log.info("[OUTGOING RESPONSE] GET /foods/filter - Completed successfully\n");
        
        return foodResponses;
    }

    
}