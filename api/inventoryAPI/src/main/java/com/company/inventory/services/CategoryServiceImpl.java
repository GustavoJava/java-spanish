package com.company.inventory.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.company.inventory.dao.ICategoryDao;
import com.company.inventory.model.Category;
import com.company.inventory.response.CategoryResponseRest;

@Service
public class CategoryServiceImpl implements ICategoryService {

	@Autowired
	private ICategoryDao categoryDao;

	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<CategoryResponseRest> search() {

		CategoryResponseRest response = new CategoryResponseRest();

		try {

			List<Category> category = (List<Category>) categoryDao.findAll();
			response.getCategoryResponse().setCategory(category);
			response.setMetadata("resposta OK", "00", "exitosa");

		} catch (Exception e) {
			response.setMetadata("Erro", "-1", "erro listar");
		}

		return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional(readOnly = true)
	public ResponseEntity<CategoryResponseRest> searchById(Long id) {

		CategoryResponseRest response = new CategoryResponseRest();
		List<Category> list = new ArrayList<>();

		try {

			Optional<Category> category = categoryDao.findById(id);

			if (category.isPresent()) {
				list.add(category.get());
				response.getCategoryResponse().setCategory(list);
				response.setMetadata("categoria encontrada", "00", "categoria encontrada");
			} else {
				response.setMetadata("não encontrado", "-1", "categoria não encontrada");
				return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.NOT_FOUND);

			}

		} catch (Exception e) {
			response.setMetadata("Erro", "-1", "erro consultar por id");
			return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<CategoryResponseRest> save(Category category) {
		
		CategoryResponseRest response = new CategoryResponseRest();
		List<Category> list = new ArrayList<>();

		try {

			Category categorySaved = categoryDao.save(category);

			if (Objects.nonNull(categorySaved)) {
				list.add(categorySaved);
				response.getCategoryResponse().setCategory(list);
				response.setMetadata("criado", "00", "categoria criada com sucesso!");
			} else {
				response.setMetadata("não criado", "-1", "categoria não criada");
				return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			response.setMetadata("Erro", "-1", "erro gravar categoria");
			return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<CategoryResponseRest> update(Category category, Long id) {
		CategoryResponseRest response = new CategoryResponseRest();
		List<Category> list = new ArrayList<>();

		try {

			Optional<Category> categorySearch = categoryDao.findById(id);

			if (categorySearch.isPresent()) {
				categorySearch.get().setName(category.getName());
				categorySearch.get().setDescription(category.getDescription());
					
				Category categoryUpdated = categoryDao.save(categorySearch.get()); 
			
				if (Objects.nonNull(categoryUpdated)) {
					list.add(categoryUpdated);
					response.getCategoryResponse().setCategory(list);
					response.setMetadata("atualizada", "00", "categoria atualizada com sucesso!");

				} else {
					response.setMetadata("não atualizado", "-1", "categoria não atualizada");
					return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.BAD_REQUEST);
				}
			} else {
				response.setMetadata("não encontrada", "-1", "categoria não encontrada");
				return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.NOT_FOUND);
			}

		} catch (Exception e) {
			response.setMetadata("Erro", "-1", "erro atualizar categoria");
			return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.OK);
	}

	@Override
	@Transactional
	public ResponseEntity<CategoryResponseRest> deleteById(Long id) {
		
		CategoryResponseRest response = new CategoryResponseRest();

		try {
			
			categoryDao.deleteById(id);
			response.setMetadata("resposta OK", "00", "categoria eliminada");


		} catch (Exception e) {
			response.setMetadata("Erro", "-1", "erro ao eliminar");
			return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<CategoryResponseRest>(response, HttpStatus.OK);
	}

}