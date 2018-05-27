import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import Product from '../../interfaces/product';

@Injectable()
export class ProductDataService {

  constructor(private http: HttpClient) { }
  getProduct(id: number):Observable<Product>{
    return this.http.get<Product>('http://localhost:8420/product/'+id);
  }
  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:8420/product');
  }
  searchProduct(keyword: string): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:8420/product?keyword='+keyword);
  }
}
