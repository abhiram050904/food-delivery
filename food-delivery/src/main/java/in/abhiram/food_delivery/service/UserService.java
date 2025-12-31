package in.abhiram.food_delivery.service;

import in.abhiram.food_delivery.request.LoginRequest;
import in.abhiram.food_delivery.request.UserRequest;
import in.abhiram.food_delivery.response.LoginResponse;
import in.abhiram.food_delivery.response.UserResponse;

public interface UserService {
    
    UserResponse register(UserRequest userRequest);

    LoginResponse login(LoginRequest loginRequest);

    UserResponse getUserById(String id);

    UserResponse updateUser(String id, UserRequest userRequest);

    String FindByUserId(UserService userService);

    void deleteUser(String id);
}
