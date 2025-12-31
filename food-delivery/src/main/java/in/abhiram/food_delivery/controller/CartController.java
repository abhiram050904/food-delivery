package in.abhiram.food_delivery.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import in.abhiram.food_delivery.request.CartRequest;
import in.abhiram.food_delivery.response.CartResponse;
import in.abhiram.food_delivery.service.CartService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/cart")
@AllArgsConstructor
@CrossOrigin("*")
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public CartResponse addToCart(@RequestBody CartRequest cartRequest) {
        log.info("[INCOMING REQUEST] POST /cart/add - Adding item to cart");
        log.info("[REQUEST] Food ID: {}, Quantity: {}", cartRequest.getFoodId(), cartRequest.getQuantity());
        
        CartResponse cartResponse = cartService.addToCart(cartRequest);
        
        log.info("[RESPONSE] Successfully added item to cart");
        log.info("[OUTGOING RESPONSE] POST /cart/add - Completed successfully\n");
        
        return cartResponse;
    }

    @GetMapping
    public CartResponse getCart() {
        log.info("[INCOMING REQUEST] GET /cart - Fetching user's cart");
        
        CartResponse cartResponse = cartService.getCart();
        
        log.info("[RESPONSE] Retrieved cart with {} items", cartResponse.getItems().size());
        log.info("[OUTGOING RESPONSE] GET /cart - Completed successfully\n");
        
        return cartResponse;
    }

    @PutMapping("/update")
    public CartResponse updateCartItem(@RequestBody CartRequest cartRequest) {
        log.info("[INCOMING REQUEST] PUT /cart/update - Updating cart item");
        log.info("[REQUEST] Food ID: {}, New Quantity: {}", cartRequest.getFoodId(), cartRequest.getQuantity());
        
        CartResponse cartResponse = cartService.updateCartItem(cartRequest);
        
        log.info("[RESPONSE] Successfully updated cart item");
        log.info("[OUTGOING RESPONSE] PUT /cart/update - Completed successfully\n");
        
        return cartResponse;
    }

    @DeleteMapping("/remove/{foodId}")
    public CartResponse removeCartItem(@PathVariable String foodId) {
        log.info("[INCOMING REQUEST] DELETE /cart/remove/{} - Removing item from cart", foodId);
        
        CartResponse cartResponse = cartService.removeCartItem(foodId);
        
        log.info("[RESPONSE] Successfully removed item from cart");
        log.info("[OUTGOING RESPONSE] DELETE /cart/remove/{} - Completed successfully\n", foodId);
        
        return cartResponse;
    }

    @DeleteMapping("/clear")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clearCart() {
        log.info("[INCOMING REQUEST] DELETE /cart/clear - Clearing entire cart");
        
        cartService.clearCart();
        
        log.info("[RESPONSE] Successfully cleared cart");
        log.info("[OUTGOING RESPONSE] DELETE /cart/clear - Completed successfully\n");
    }
}
