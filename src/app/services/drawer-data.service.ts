import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Drawer from '../../interfaces/drawer';
import Resp from '../../interfaces/response';
@Injectable()
export class DrawerDataService {

  constructor(private http: HttpClient) { }

  getDrawer(username: string):Observable<Drawer[]>{
    return this.http.get<Drawer[]>('http://localhost:8420/drawer/'+username);
  }

  clearDrawer(username: string):Observable<Resp>{
    return this.http.delete<Resp>('http://localhost:8420/drawer/'+username);
  }
}
