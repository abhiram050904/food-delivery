package in.abhiram.food_delivery.service;

import org.springframework.security.core.Authentication;

public interface AuthenticationFacade {

    
    Authentication getAuthentication();
}
