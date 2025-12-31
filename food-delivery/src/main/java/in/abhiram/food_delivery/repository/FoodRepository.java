package in.abhiram.food_delivery.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import in.abhiram.food_delivery.entity.FoodEntity;

@Repository
public interface FoodRepository extends MongoRepository<FoodEntity, String> {
    
    List<FoodEntity> findByNameContainingIgnoreCase(String name);
    
    List<FoodEntity> findByCategory(String category);
    
    List<FoodEntity> findByPriceBetween(double minPrice, double maxPrice);
    
    @Query("{ 'name': { $regex: ?0, $options: 'i' }, 'category': ?1 }")
    List<FoodEntity> findByNameAndCategory(String name, String category);
    
    @Query("{ 'category': ?0, 'price': { $gte: ?1, $lte: ?2 } }")
    List<FoodEntity> findByCategoryAndPriceRange(String category, double minPrice, double maxPrice);
    
}
