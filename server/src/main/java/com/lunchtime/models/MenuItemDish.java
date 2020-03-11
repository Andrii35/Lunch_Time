package com.lunchtime.models;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class MenuItemDish {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "dish_id")
    private Long dishId;

    @NotBlank
    @Column(name = "portion_size", length = 30)
    private String portionSize;

    @NotBlank
    @Column(name = "portion_price", length = 20)
    private String portionPrice;

    @Column(name = "portion_unit")
    private Long portionUnit;

    @Column(name = "image_URL")
    private String imageUrl;

    public MenuItemDish(Long dishId, @NotBlank String portionSize, @NotBlank String portionPrice,
           Long portionUnit, String imageUrl) {

        this.dishId = dishId;
        this.portionSize = portionSize;
        this.portionPrice = portionPrice;
        this.portionUnit = portionUnit;
        this.imageUrl = imageUrl; 
    }

    public MenuItemDish() {
    }
    
    @ManyToMany
    @JoinTable(name = "menu",
              joinColumns = @JoinColumn(name = "menu_item_dish_id", referencedColumnName = "id"),
              inverseJoinColumns = @JoinColumn(name = "restaurant_id", referencedColumnName = "id")
    )   
    private Set<Restaurant> restaurant;
    
    public  Set<Restaurant> getRestaurant() {
        return restaurant;
    
    }
    
    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = (Set<Restaurant>) restaurant;
    }

}
