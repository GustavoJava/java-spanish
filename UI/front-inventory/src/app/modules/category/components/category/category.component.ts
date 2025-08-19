import { CategoryService } from './../../../shared/services/category.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(data =>{
      console.log(data);
    },(error: any)=>{
      console.error("erro: ",error);
    });
  }
}
