import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import Customer from '../../interfaces/customer';
import { Observable } from 'rxjs/Observable';
import Resp from '../../interfaces/response';
@Injectable()
export class CustomerDataService {

  constructor(private http: HttpClient) { }

  searchCustomer(keyword): Observable<Customer[]>{
    return this.http.get<Customer[]>('http://localhost:8420/customer?keyword='+keyword);
  }
  getCustomer(id: number):Observable<Customer>{
    return this.http.get<Customer>('http://localhost:8420/customer/'+id);
  }
  addCustomer(name: string, email: string, mobile: string, address: string): Observable<Resp>{
    const body = new HttpParams()
      .set('name', name)
      .set('email', email)
      .set('mobile', mobile)
      .set('address', address)

    return this.http.post<Resp>('http://localhost:8420/customer/add',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }
}
