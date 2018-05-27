import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Resp from '../../interfaces/response';
import Cart from '../../interfaces/cart';
@Injectable()
export class CartDataService {
  
  constructor(private http: HttpClient) {
  }
  
  addToCart(username: string, customerId: number, productId: number): Observable<Resp>{
    const body = new HttpParams()
      .set('username', username)
      .set('customerId', customerId.toString())
      .set('productId', productId.toString())
      

    return this.http.post<Resp>('http://localhost:8420/cart/add',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }

  getCart(username: string, customerId: number): Observable<Cart[]>{
    return this.http.get<Cart[]>('http://localhost:8420/cart?username='+username+'&customerId='+customerId.toString());
  }

  decrement(username: string, customerId: number, productId: number): Observable<Resp>{
    const body = new HttpParams()
      .set('username', username)
      .set('customerId', customerId.toString())
      .set('productId', productId.toString())

    return this.http.post<Resp>('http://localhost:8420/cart/decrement',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }

  clear(username: string, customerId: number): Observable<Resp>{
    return this.http.delete<Resp>('http://localhost:8420/cart/clear?username='+username+'&customerId='+customerId);
  }
}
