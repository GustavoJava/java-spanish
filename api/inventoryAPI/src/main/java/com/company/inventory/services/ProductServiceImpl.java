package com.company.inventory.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.company.inventory.dao.ICategoryDao;
import com.company.inventory.dao.IProductDao;
import com.company.inventory.model.Category;
import com.company.inventory.model.Product;
import com.company.inventory.response.ProductResponseRest;
import com.company.inventory.util.Util;

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
	@Transactional
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

	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<ProductResponseRest> searchById(Long id) {
		
		ProductResponseRest response = new ProductResponseRest();
		List<Product> list = new ArrayList<>();
		
		try {
			
			Optional<Product> product = this.productDao.findById(id);
			
			if (product.isPresent()) {
				byte[] imgDescompressed = Util.decompressZLib(product.get().getPicture());
				product.get().setPicture(imgDescompressed);
				list.add(product.get());
				response.getProductResponse().setProducts(list);
				response.setMetadata("resposta ok", "00", "produto encontrado!");
				return new ResponseEntity<ProductResponseRest>(response, HttpStatus.OK);
			} else {
				response.setMetadata("resposta nok", "-1", "produto não encontrado!");
				return new ResponseEntity<ProductResponseRest>(response, HttpStatus.NOT_FOUND);
			}
			
		}catch(Exception e) {
			response.setMetadata("resposta nok", "-1", "erro produto não encontrado!");
			return new ResponseEntity<ProductResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}

	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<ProductResponseRest> searchByName(String name) {
		ProductResponseRest response = new ProductResponseRest();
		List<Product> list = new ArrayList<>();
		List<Product> listAux = new ArrayList<>();
		
		try {
			
			listAux = this.productDao.findByNameContainingIgnoreCase(name);
			
			if (!listAux.isEmpty()) {
				
				listAux.stream().forEach(p ->{
					byte[] imgDescompressed = Util.decompressZLib(p.getPicture());
					p.setPicture(imgDescompressed);
					list.add(p);
				});
				
				//list.addAll(listAux);
				response.getProductResponse().setProducts(list);
				response.setMetadata("resposta ok", "00", "produtos encontrados!");
				return new ResponseEntity<ProductResponseRest>(response, HttpStatus.OK);
			} else {
				response.setMetadata("resposta nok", "-1", "produtos não encontrados!");
				return new ResponseEntity<ProductResponseRest>(response, HttpStatus.NOT_FOUND);
			}
			
		}catch(Exception e) {
			response.setMetadata("resposta nok", "-1", "erro ao buscar produto!");
			return new ResponseEntity<ProductResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	@Transactional
	public ResponseEntity<ProductResponseRest> deleteById(Long id) {
		
		ProductResponseRest response = new ProductResponseRest();
		
		try {
			
			this.productDao.deleteById(id);
			response.setMetadata("resposta ok", "00", "produto eliminado!");
			
		}catch(Exception e) {
			response.setMetadata("resposta nok", "-1", "erro ao excluir produto!");
			return new ResponseEntity<ProductResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ProductResponseRest>(response, HttpStatus.OK);
		
	}

}
