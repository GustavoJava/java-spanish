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

  estadoFormulario = "Adicionar Novo Produto";
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

     if(this.data){
      console.log('data ', this.data);

      this.updateForm(this.data);
      this.estadoFormulario = "Atualizar Produto";
    }

  }

  updateForm(data: any){
    this.productForm = this.fb.group({
      name: [data.name,[Validators.required, Validators.minLength(5)]],
      price: [data.price, Validators.required],
      account: [data.account, Validators.required],
      category:[data.category.id, Validators.required],
      picture: ['', Validators.required]
    });

  }

  onSave() {

    const formValue = this.productForm.value;
    const formData = new FormData();

    formData.append('name', formValue.name);
    formData.append('price', formValue.price);
    formData.append('account', formValue.account);
    formData.append('categoryId', formValue.category);

    const pictureFile: File = this.selectedFile;

    if (pictureFile) {
      formData.append('picture', pictureFile, pictureFile.name);
    }

    if(this.data){
      this.productService.updateProduct(formData, this.data.id).subscribe((data: any)=>{
        this.dialogRef.close(1);
      }, (error: any) => {
        console.log('error update product', error);
        this.dialogRef.close(2);
      });

      }else {
      this.productService.saveProducts(formData).subscribe((data) => {
        this.dialogRef.close(1);
      }, (error: any) => {
        console.log('error save product', error);
        this.dialogRef.close(2);
      });

    }

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
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.nameImg = file.name;
    }
  }

}
