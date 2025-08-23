import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  base_url = environment.base_url;
  endpoint = '';

  constructor(private http: HttpClient) { }

  getCategories(){
    this.endpoint = `${this.base_url}/categories`;
    return this.http.get(this.endpoint);
  }

  saveCategorie(body: any){
    this.endpoint = `${this.base_url}/categories`;
    return this.http.post(this.endpoint, body);
  }
}
