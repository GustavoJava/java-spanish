import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from './../../services/category.service';
import { Component, inject, OnInit } from '@angular/core';
import { EnumModules } from '../../enums/enum-modules';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef<ConfirmComponent>);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

  delete(){
    if(this.data){
        this.checkModules(this.data);

    } else {
      this.dialogRef.close(2);
    }

 }

 checkModules(data: any) {

    switch (data.module) {
      case EnumModules.PRODUCT:
        this.deleteProduct(this.data.id);
        break;
      case EnumModules.CATEGORY:
        this.deleteCategory(this.data.id);
        break;
      default:
        this.dialogRef.close(2);
        break;
    }

}

deleteCategory(id: any){
  this.categoryService.deleteCategorie(id).subscribe((data: any)=>{
      this.dialogRef.close(1);
    },(error: any)=>{
      this.dialogRef.close(2);
    });
}

deleteProduct(id: any){
  this.productService.deleteProduct(id).subscribe((data: any)=>{
      this.dialogRef.close(1);
    },(error: any)=>{
      this.dialogRef.close(2);
    });
}

}




