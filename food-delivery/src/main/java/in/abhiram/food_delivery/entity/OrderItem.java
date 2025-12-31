package in.abhiram.food_delivery.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {

    private String id;
    private String foodId;
    private int quantity;
    private String Catogory;
    private String imageUrl;
    private String description;
    private double totalPrice;
    private String name;
    private String status;
    
}
