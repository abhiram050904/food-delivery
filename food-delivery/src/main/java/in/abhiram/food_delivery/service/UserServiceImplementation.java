package in.abhiram.food_delivery.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.abhiram.food_delivery.config.JwtUtil;
import in.abhiram.food_delivery.entity.UserEntity;
import in.abhiram.food_delivery.repository.UserRepository;
import in.abhiram.food_delivery.request.LoginRequest;
import in.abhiram.food_delivery.request.UserRequest;
import in.abhiram.food_delivery.response.LoginResponse;
import in.abhiram.food_delivery.response.UserResponse;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final AuthenticationFacade authenticationFacade;
    @Override
    public UserResponse register(UserRequest userRequest) {
        // Validate password strength
        validatePassword(userRequest.getPassword());
        
        // Check if user already exists
        if (userRepository.findByUsername(userRequest.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        UserEntity newUserEntity = convUserEntityFromUserRequest(userRequest);
        // Encrypt password before saving
        newUserEntity.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        UserEntity savedUserEntity = userRepository.save(newUserEntity);
        return convUserResponseFromUserEntity(savedUserEntity);
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        // Authenticate user
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        
        // Find user
        UserEntity user = userRepository.findByUsername(loginRequest.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getUsername());
        
        return LoginResponse.builder()
            .token(token)
            .username(user.getUsername())
            .email(user.getEmail())
            .message("Login successful")
            .build();
    }

    @Override
    public UserResponse getUserById(String id) {
        UserEntity user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return convUserResponseFromUserEntity(user);
    }

    @Override
    public UserResponse updateUser(String id, UserRequest userRequest) {
        UserEntity user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        user.setUsername(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());
        if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
            validatePassword(userRequest.getPassword());
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }
        
        UserEntity updatedUser = userRepository.save(user);
        return convUserResponseFromUserEntity(updatedUser);
    }

    @Override
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public String FindByUserId(UserService userService) {
        String loggedInUsername = authenticationFacade.getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(loggedInUsername)
            .orElseThrow(() -> new RuntimeException("User not found with username: " + loggedInUsername));
        return user.getId();
    }

    private void validatePassword(String password) {
        if (password == null || password.length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long");
        }
        
        boolean hasUpperCase = false;
        boolean hasSpecialChar = false;
        String specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        
        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c)) {
                hasUpperCase = true;
            }
            if (specialChars.indexOf(c) >= 0) {
                hasSpecialChar = true;
            }
        }
        
        if (!hasUpperCase) {
            throw new RuntimeException("Password must contain at least one uppercase letter");
        }
        if (!hasSpecialChar) {
            throw new RuntimeException("Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)");
        }
    }

    private UserEntity convUserEntityFromUserRequest(UserRequest userRequest) {
        return UserEntity.builder()
                .username(userRequest.getUsername())
                .password(userRequest.getPassword()) // Will be encoded in register method
                .email(userRequest.getEmail())
                .build();
    }

    private UserResponse convUserResponseFromUserEntity(UserEntity userEntity) {
        return UserResponse.builder()
                .id(userEntity.getId())
                .username(userEntity.getUsername())
                .email(userEntity.getEmail())
                .build();
    }
    
}
