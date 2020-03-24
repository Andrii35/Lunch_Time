package com.lunchtime.repository;

import com.lunchtime.models.CategoryFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryFoodRepository extends JpaRepository<CategoryFood, Long> {

}