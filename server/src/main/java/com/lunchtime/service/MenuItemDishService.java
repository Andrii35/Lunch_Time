package com.lunchtime.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.lunchtime.models.MenuItemDish;

public interface MenuItemDishService {

    MenuItemDish save(MenuItemDish menuItemDish);

    Page<MenuItemDish> findAll(Pageable pageable);

    Optional<MenuItemDish> findById(Long id);

    Page<MenuItemDish> findByRestaurantId(Long id, Pageable pageable);

    Page<MenuItemDish> findDishesByRestaurantIdAndCategoryName(String name,
                                                                   Long id, Pageable pageable);
}
