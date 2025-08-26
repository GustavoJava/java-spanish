import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { CategoryService } from './../../../shared/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private categoryService = inject(CategoryService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);

  displayColumns: string[] = ['id','name','description','actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(data =>{
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
    width: '350px',
   });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
         this.openSnackBar("Categoria adicionada","Sucesso");
         this.getCategories();
      } else if(result == 2){
         this.openSnackBar("Erro ao salvar Categoria","Erro");
      }

    });
  }

  openSnackBar(message: string,action: string): MatSnackBarRef<SimpleSnackBar>{
      return this.snackBar.open(message, action, {
        duration: 2500,
        verticalPosition: 'top'
      })
  }

  edit(id: any,name: string,description: string) {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
    width: '350px',
    data:{id: id,name: name,description: description}
   });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
         this.openSnackBar("Categoria atualizada","Sucesso");
         this.getCategories();
      } else if(result == 2){
         this.openSnackBar("Erro ao atualizar Categoria","Erro");
      }

    });

  }

}

export  interface CategoryElement {
    id: number;
    name: string;
    description: string
}
