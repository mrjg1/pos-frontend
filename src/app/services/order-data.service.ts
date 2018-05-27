import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import Cart from '../../interfaces/cart';
import { Observable } from 'rxjs/Observable';
import Resp from '../../interfaces/response';
import Order from '../../interfaces/order';
@Injectable()
export class OrderDataService {

  constructor(private http: HttpClient) { }

  checkoutOrder(cart: Cart[], total: number): Observable<Resp> {
    let cartIdArr: Array<Number> = cart.map((c) => c.id);
    const body = new HttpParams()
      .set('cart', cartIdArr.toString())
      .set('total', (total+10).toString())

    return this.http.post<Resp>('http://localhost:8420/order/add',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }
  saveOrder(orderNumber: string): Observable<Resp> {
    const body = new HttpParams()
      .set('orderNumber', orderNumber)

    return this.http.put<Resp>('http://localhost:8420/order/save',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }
  placeOrder(orderNumber: string, paymentMethod: string): Observable<Resp> {
    const body = new HttpParams()
      .set('orderNumber', orderNumber)
      .set('paymentMethod', paymentMethod)

    return this.http.put<Resp>('http://localhost:8420/order/place',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }
  getSavedOrders(username: string): Observable<Order[]>{
    return this.http.get<Order[]>('http://localhost:8420/order/saved/'+username);
  }
  getPlacedOrders(username: string): Observable<Order[]>{
    return this.http.get<Order[]>('http://localhost:8420/order/placed/'+username);
  }
  deleteSavedOrder(orderNumber: number): Observable<Resp>{
    return this.http.delete<Resp>('http://localhost:8420/order/saved/'+orderNumber);
  }
  reloadSavedOrder(orderNumber: number): Observable<Resp>{
    return this.http.get<Resp>('http://localhost:8420/order/saved/reload/'+orderNumber);
  }
}
