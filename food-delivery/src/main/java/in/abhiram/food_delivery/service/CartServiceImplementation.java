package in.abhiram.food_delivery.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import in.abhiram.food_delivery.entity.CartEntity;
import in.abhiram.food_delivery.repository.CartRepository;
import in.abhiram.food_delivery.repository.FoodRepository;
import in.abhiram.food_delivery.request.CartRequest;
import in.abhiram.food_delivery.response.CartResponse;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CartServiceImplementation implements CartService{

    private final CartRepository cartRepository;
    private final UserService userService;
    private final FoodRepository foodRepository;

    @Override
    public CartResponse addToCart(CartRequest cartRequest) {
        String loggedInUserId = userService.FindByUserId(userService);

        // Validate that food exists
        if (!foodRepository.existsById(cartRequest.getFoodId())) {
            throw new RuntimeException("Food not found with id: " + cartRequest.getFoodId());
        }

        // Get or create cart
        Optional<CartEntity> cartOpt = cartRepository.findByUserId(loggedInUserId);
        CartEntity cart = cartOpt.orElseGet(() -> new CartEntity(loggedInUserId, new HashMap<>()));

        // Update cart items
        Map<String, Integer> items = cart.getItems();
        int quantity = cartRequest.getQuantity() > 0 ? cartRequest.getQuantity() : 1;
        items.put(cartRequest.getFoodId(), items.getOrDefault(cartRequest.getFoodId(), 0) + quantity);
        cart.setItems(items);

        CartEntity savedCart = cartRepository.save(cart);
        return convertToCartResponse(savedCart);
    }

    @Override
    public CartResponse getCart() {
        String loggedInUserId = userService.FindByUserId(userService);

        Optional<CartEntity> cartOpt = cartRepository.findByUserId(loggedInUserId);
        CartEntity cart = cartOpt.orElseGet(() -> new CartEntity(loggedInUserId, new HashMap<>()));

        return convertToCartResponse(cart);
    }

    @Override
    public CartResponse updateCartItem(CartRequest cartRequest) {
        String loggedInUserId = userService.FindByUserId(userService);

        CartEntity cart = cartRepository.findByUserId(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user"));

        Map<String, Integer> items = cart.getItems();

        if (!items.containsKey(cartRequest.getFoodId())) {
            throw new RuntimeException("Item not found in cart");
        }

        // Update quantity
        if (cartRequest.getQuantity() > 0) {
            items.put(cartRequest.getFoodId(), cartRequest.getQuantity());
        } else {
            items.remove(cartRequest.getFoodId());
        }

        cart.setItems(items);
        CartEntity savedCart = cartRepository.save(cart);

        return convertToCartResponse(savedCart);
    }

    @Override
    public CartResponse removeCartItem(String foodId) {
        String loggedInUserId = userService.FindByUserId(userService);

        CartEntity cart = cartRepository.findByUserId(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user"));

        Map<String, Integer> items = cart.getItems();

        if (!items.containsKey(foodId)) {
            throw new RuntimeException("Item not found in cart");
        }

        items.remove(foodId);
        cart.setItems(items);
        CartEntity savedCart = cartRepository.save(cart);

        return convertToCartResponse(savedCart);
    }

    @Override
    public void clearCart() {
        String loggedInUserId = userService.FindByUserId(userService);
        cartRepository.deleteByUserId(loggedInUserId);
    }

    private CartResponse convertToCartResponse(CartEntity cart) {
        return CartResponse.builder()
                .id(cart.getId())
                .userId(cart.getUserId())
                .items(cart.getItems())
                .build();
    }
}
