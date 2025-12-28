package in.abhiram.food_delivery.controller;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import in.abhiram.food_delivery.request.FoodRequest;
import in.abhiram.food_delivery.response.FoodResponse;
import in.abhiram.food_delivery.service.FoodService;
import lombok.AllArgsConstructor;
import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/foods")
@AllArgsConstructor
public class FoodController {

    private final FoodService foodService;

    public FoodResponse addFood(@RequestPart("food") String foodString,
            @RequestPart("file") MultipartFile file) {

                ObjectMapper objectMapper = new ObjectMapper();
                FoodRequest foodRequest= null;
                try {
                    foodRequest = objectMapper.readValue(foodString, FoodRequest.class);
                } catch (Exception e) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid food data: " + e.getMessage());
                }

                FoodResponse foodResponse=foodService.addFood(foodRequest, file);
                return foodResponse;
    }
    
}
