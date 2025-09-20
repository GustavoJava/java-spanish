package com.company.inventory.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.company.inventory.model.Product;
import com.company.inventory.response.ProductResponseRest;
import com.company.inventory.services.IProductService;
import com.company.inventory.util.Util;

//@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/v1")
public class ProductRestController {
	
	private IProductService iProductService;
	
	public ProductRestController(IProductService iProductService) {
		super();
		this.iProductService = iProductService;
	}


	/**
	 * save product 
	 * 
	 * @param picture
	 * @param name
	 * @param price
	 * @param account
	 * @param categoryID
	 * @return
	 * @throws IOException
	 */
	@PostMapping("/products")
	public ResponseEntity<ProductResponseRest> save(
			@RequestParam("picture") MultipartFile picture,
			@RequestParam("name") String name,
			@RequestParam("price") int price,
			@RequestParam("account") int account,
			@RequestParam("categoryId") Long categoryID) throws IOException{
		
		Product product = new Product();
		product.setName(name);
		product.setAccount(account);
		product.setPrice(price);
		product.setPicture(Util.compressZLib(picture.getBytes()));
		
		ResponseEntity<ProductResponseRest> response = this.iProductService.save(product, categoryID);
		
		return response;
	}
	
	/**
	  * search by Id with PathVariable
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping("/products/{id}")
	public ResponseEntity<ProductResponseRest> searchById(@PathVariable Long id){
		ResponseEntity<ProductResponseRest> response = this.iProductService.searchById(id);
		return response;
	}
	
	/**
	 * search by name with PathVariable
	 * 
	 * @param name
	 * @return
	 */
	@GetMapping("/products/filter/{name}")
	public ResponseEntity<ProductResponseRest> searchByName(@PathVariable String name){
		ResponseEntity<ProductResponseRest> response = this.iProductService.searchByName(name);
		return response;
	}
	
	/**
	 * search by name with RequestParam
	 * 
	 * @param name
	 * @return
	 */
	@GetMapping("/products/search")
	public ResponseEntity<ProductResponseRest> findProductByName(@RequestParam String name) {
		ResponseEntity<ProductResponseRest> response = this.iProductService.searchByName(name);
		return response;
    }
	
	@DeleteMapping("/products/{id}")
	public ResponseEntity<ProductResponseRest> delete(@PathVariable Long id){
		ResponseEntity<ProductResponseRest> response = this.iProductService.deleteById(id);
		return response;
	}
	
	/**
	 * search all products
	 * 
	 * @return
	 */
	@GetMapping("/products/")
	public ResponseEntity<ProductResponseRest> search(){
		ResponseEntity<ProductResponseRest> response = this.iProductService.search();
		return response;
	}
	
}
