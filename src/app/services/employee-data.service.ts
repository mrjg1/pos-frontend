import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import Resp from '../../interfaces/response';

@Injectable()
export class EmployeeDataService {

  constructor(private http: HttpClient) { }

  authorizeEmployee(username: string, password: string): Observable<Resp> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post<Resp>('http://localhost:8420/employee/login',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }

  addEmployee(username: string, password: string, secret: number): Observable<Resp> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('secret', secret.toString())

    return this.http.post<Resp>('http://localhost:8420/employee/signup',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }

  updateEmployeeCash(username: string, cash: string): Observable<Resp> {
    const body = new HttpParams()
      .set('username', username)
      .set('cash', cash);

    return this.http.post<Resp>('http://localhost:8420/employee/login/cash',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }
  getEmployeeCash(username: string): Observable<Resp> {
    return this.http.get<Resp>('http://localhost:8420/employee/cash/' + username);
  }

  getSalesReport(from: string, to: string): Observable<Blob> {
    // const body = new HttpParams()
    //   .set('from', from)
    //   .set('to', to)

    return this.http.get<Blob>('http://localhost:8420/employee/sales-report/' + from + '/' + to, 
      { responseType: 'blob' as 'json' });
  }
}
