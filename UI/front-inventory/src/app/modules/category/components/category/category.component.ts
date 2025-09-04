import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';

import { NewCategoryComponent } from '../new-category/new-category.component';
import { CategoryService } from './../../../shared/services/category.service';

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
      this.dataSource.paginator = this.paginator;
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

  edit(element: CategoryElement) {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
    width: '350px',
    data: element
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

  eliminar(element: CategoryElement) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
    width: '350px',
    data: element
   });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
         this.openSnackBar("Categoria eliminada!","Sucesso");
         this.getCategories();
      } else if(result == 2){
         this.openSnackBar("Erro ao atualizar Categoria","Erro");
      }

    });
  }

  buscar(busca: string) {

    if(!busca){
      return this.getCategories();
    }

    this.categoryService.getCategorieById(busca).subscribe(response =>{
      this.processesCategoriesResponse(response)
    })
  }

}

export  interface CategoryElement {
    id: number;
    name: string;
    description: string
}
