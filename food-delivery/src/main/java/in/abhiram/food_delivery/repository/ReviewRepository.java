package in.abhiram.food_delivery.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import in.abhiram.food_delivery.entity.ReviewEntity;

@Repository
public interface ReviewRepository extends MongoRepository<ReviewEntity, String> {
    List<ReviewEntity> findByFoodId(String foodId);
    List<ReviewEntity> findByUserId(String userId);
}
