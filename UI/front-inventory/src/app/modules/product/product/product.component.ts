import { ProductService } from './../../shared/services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
applyFilter($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}

  constructor(){}

  private service = inject(ProductService);

   displayColumns: string[] = ['id','name','price', 'account','category', 'picture', 'actions'];
   dataSource = new MatTableDataSource<ProductElement>();
   @ViewChild(MatPaginator) paginator!: MatPaginator;

   ngOnInit(): void {
    this.getProducts();
   }

   getProducts(){
    this.service.getProducts().subscribe((response)=>{

      this.processProductResponse(response);
     },(error: any)=>{
      console.error("erro: ",error);
    });

   }

   processProductResponse(response: any){
    const dateProduct: ProductElement[] = [];

    if(response.metadata[0].code == '00'){
      let listCProduct = response.productResponse.products;

      listCProduct.forEach((element:ProductElement)  => {
        element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dateProduct.push(element);
      });
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);

    }

   }

}

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}
