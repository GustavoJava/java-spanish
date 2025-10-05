import { CategoryService } from './../../shared/services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from './../../shared/services/product.service';
import { Component, inject, OnInit } from '@angular/core';

export  interface Category {
    id: number;
    name: string;
    description: string
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{


  public productForm!: FormGroup;
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef<NewProductComponent>);
  public data = inject(MAT_DIALOG_DATA);

  estadoFormulario = "Adicionar";
  categories: Category[] = [];
  selectedFile: any;
  nameImg = '';

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(5)]],
      price: ['', Validators.required],
      account: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required],
    });
  }

  onSave() {

   const formValue = this.productForm.value;
   const uploadData = new FormData();

   uploadData.append('name', formValue.name);
   uploadData.append('price', formValue.price);
   uploadData.append('account', formValue.account);
   uploadData.append('categoryId', formValue.category);

  const pictureFile: File = this.selectedFile;

  if (pictureFile) {
    uploadData.append('picture', pictureFile, pictureFile.name);
  }

  this.productService.saveProducts(uploadData).subscribe((data) => {
    console.log(data);
    this.dialogRef.close(1);
  }, (error: any) => {
    console.log('error save ', error);
    this.dialogRef.close(2);
  });

  }

  onCancel() {
    this.dialogRef.close(3);
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((data: any)=>{
      this.categories = data.categoryResponse.category;
    },(error: any)=>{
      console.log("error ",error);
    });

  }

  onfileChange(event: any) {
    // const file: File = event.target.files[0];
    // if (file) {
    //   this.nameImg = file.name;
    // }
    this.selectedFile = event.target.files[0];
    this.nameImg = event.target.files[0].name;
  }

}
