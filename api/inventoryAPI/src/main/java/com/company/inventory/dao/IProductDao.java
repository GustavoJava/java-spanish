package com.company.inventory.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.company.inventory.model.Category;
import com.company.inventory.model.Product;

@Repository
public interface IProductDao extends CrudRepository<Product, Long>{

}
