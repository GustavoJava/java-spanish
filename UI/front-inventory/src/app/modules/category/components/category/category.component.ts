import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { CategoryService } from './../../../shared/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  private categoryService = inject(CategoryService);

  displayColumns: string[] = ['id','name','description','actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  constructor(public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(data =>{
      //console.log(data);
      this.processesCategoriesResponse(data);
    },(error: any)=>{
      console.error("erro: ",error);
    });
  }

  processesCategoriesResponse(resp: any){
    if(resp.metadata[0].code == "00"){
      let listCategory = resp.categoryResponse.category;
      this.dataSource = new MatTableDataSource<CategoryElement>(listCategory);
      console.log(this.dataSource.data);
    }
  }

  openCategoryDialog() {

   const dialogRef = this.dialog.open(NewCategoryComponent, {
    width: '450px',
   });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
         console.log('OPCAO SIM');
      } else {
            console.log('OPCAO NÃO');
      }

    });
  }

}

export  interface CategoryElement {
    id: number;
    name: string;
    description: string
}
