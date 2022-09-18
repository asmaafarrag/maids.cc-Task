import { Injectable } from '@angular/core';

import { RequestOrderDet } from '../Models/request-order-det.model';
import { Item } from '../Models/item';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestOrderService {


 // readonly rootUrl = 'http://104.196.134.107/AfitAPI';
 //readonly rootUrl = 'http://localhost:22376';

  constructor(private http: HttpClient) { }

  RequestOrderDs : RequestOrderDet[] = 
    [
      {
        RequestOrderDetId: 1,
        RequestOrderId: 1,
        ItemID: '1',
        ItemName: 'Iron',
        Price: 10.5,
        Qty: 15,
        UnitName: 'KG',
        Tot: 157.5
      },
      {
        RequestOrderDetId: 2,
        RequestOrderId: 1,
        ItemID: '2',
        ItemName: 'Water',
        Price: 5,
        Qty: 3,
        UnitName: 'KG',
        Tot: 15
      }
    ];

  getRequestOrderDets(): RequestOrderDet[] {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    //return this.http.get(this.rootUrl + '/api/store', { headers: reqHeader }).pipe(map(data => <RequestOrderDet[]>data));
    return this.RequestOrderDs;
  }

  
}
