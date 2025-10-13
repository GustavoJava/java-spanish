import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   private base_url = environment.base_url;
   private endpoint = '';

  constructor(private http: HttpClient) { }

  getProducts(){
    this.endpoint = `${this.base_url}/products`;
    return this.http.get(this.endpoint);
  }

  saveProducts(body: any){
    this.endpoint = `${this.base_url}/products`;
    return this.http.post(this.endpoint, body);
  }

  updateProduct(body: any, id: any){
      this.endpoint = `${this.base_url}/products/${id}`;
      return this.http.put(this.endpoint, body);
  }

  deleteProduct(id: any){
    this.endpoint = `${this.base_url}/products/${id}`;
    return this.http.delete(this.endpoint);
  }

}
