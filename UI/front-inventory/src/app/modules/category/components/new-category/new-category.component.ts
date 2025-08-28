import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CategoryService } from './../../../shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryForm!: FormGroup;
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef<NewCategoryComponent>);
  public data = inject(MAT_DIALOG_DATA);

  estadoFormulario = "Adicionar";

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.categoryForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required]
    });

    if(this.data){
      this.updateForm(this.data);
      this.estadoFormulario = "Atualizar";
    }

  }

  onSave() {

    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }

    if(this.data){
        this.categoryService.updateCategorie(data, this.data.id).subscribe((data: any)=>{
          console.log('data ',data);
          this.dialogRef.close(1);;
        }),(error: any)=>{
          console.log(error);
          this.dialogRef.close(2);
        }
    } else {
      this.categoryService.saveCategorie(data).subscribe((data)=>{
      this.dialogRef.close(1);
    }),(error: any)=>{
      console.log(error);
      this.dialogRef.close(2);
    }
    }

  }

  onCancel() {
      this.dialogRef.close(3);
  }


  updateForm(data: any) {
      this.categoryForm = this.fb.group({
      name: [data.name,Validators.required],
      description: [data.description,Validators.required]
    });
    console.log('update ',this.categoryForm.value);

  }

}


