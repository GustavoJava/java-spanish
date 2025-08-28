import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from './../../services/category.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

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
      this.categoryService.deleteCategorie(this.data.id).subscribe((data: any)=>{
      this.dialogRef.close(1);
    },(error: any)=>{
      this.dialogRef.close(2);
    })
  } else {
    this.dialogRef.close(2);
  }

 }

}
