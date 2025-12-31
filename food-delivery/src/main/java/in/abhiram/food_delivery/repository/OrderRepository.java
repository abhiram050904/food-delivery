package in.abhiram.food_delivery.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import in.abhiram.food_delivery.entity.OrderEntity;

@Repository
public interface OrderRepository extends MongoRepository<OrderEntity, String> {
    
    List<OrderEntity> findByUserId(String userId);
    
    List<OrderEntity> findByOrderStatus(String orderStatus);
    
    List<OrderEntity> findByUserIdAndOrderStatus(String userId, String orderStatus);
}
