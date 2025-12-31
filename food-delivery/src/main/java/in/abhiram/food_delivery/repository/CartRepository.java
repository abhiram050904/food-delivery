package in.abhiram.food_delivery.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import in.abhiram.food_delivery.entity.CartEntity;

@Repository
public interface CartRepository extends MongoRepository<CartEntity, String> {
    
    Optional<CartEntity> findByUserId(String userId);

    @Transactional
    void deleteByUserId(String userId);
}