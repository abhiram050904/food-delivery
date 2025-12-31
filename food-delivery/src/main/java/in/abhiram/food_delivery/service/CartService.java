package in.abhiram.food_delivery.service;

import in.abhiram.food_delivery.request.CartRequest;
import in.abhiram.food_delivery.response.CartResponse;

public interface CartService {
    CartResponse addToCart(CartRequest cartRequest);
    CartResponse getCart();
    CartResponse updateCartItem(CartRequest cartRequest);
    CartResponse removeCartItem(String foodId);
    void clearCart();
}
