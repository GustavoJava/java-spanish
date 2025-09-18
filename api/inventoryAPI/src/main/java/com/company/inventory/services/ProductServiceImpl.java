package com.company.inventory.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.company.inventory.dao.ICategoryDao;
import com.company.inventory.dao.IProductDao;
import com.company.inventory.model.Category;
import com.company.inventory.model.Product;
import com.company.inventory.response.ProductResponseRest;

@Service
public class ProductServiceImpl implements IProductService{
	
	private ICategoryDao categoryDao;
	private IProductDao productDao;
	
	public ProductServiceImpl(ICategoryDao categoryDao, IProductDao productDao) {
		super();
		this.categoryDao = categoryDao;
		this.productDao = productDao;
	}

	@Override
	public ResponseEntity<ProductResponseRest> save(Product product, Long categoryId) {

		ProductResponseRest response = new ProductResponseRest();
		List<Product> list = new ArrayList<>();
		
		try {
			
			Optional<Category> category = this.categoryDao.findById(categoryId);
			
			if (category.isPresent()) {
				product.setCategory(category.get());
			} else {
				response.setMetadata("resposta nok", "-1", "categoria não encontrada");
				return new ResponseEntity<ProductResponseRest>(response, HttpStatus.NOT_FOUND);
			}
			
			Product productSaved = productDao.save(product);
			
			if (Objects.nonNull(productSaved)) {
				list.add(productSaved);
				response.getProductResponse().setProducts(list);
				response.setMetadata("resposta OK", "00", "produto salvo com sucesso!");
			} else {
				response.setMetadata("resposta nok", "-1", "erro produto não salvo!");
				return new ResponseEntity<ProductResponseRest>(response, HttpStatus.BAD_REQUEST);
			}
			
		}catch(Exception e) {
			response.setMetadata("resposta nok", "-1", "erro produto não salvo!");
			return new ResponseEntity<ProductResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ProductResponseRest>(response, HttpStatus.OK);
		
	}

}
