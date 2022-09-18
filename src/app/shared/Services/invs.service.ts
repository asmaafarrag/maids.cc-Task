import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { SalesInv } from '../Models/sales-inv';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InvsService {
  formData : SalesInv;
  constructor(private http: HttpClient) { }

  getInvsIn(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Invs/R', { headers: reqHeader, params:param }).pipe(map(data => data));
  }

  getInvsInByUser(UserId: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Invs/GetByUser/R?UserId='+UserId, { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  getInvsOut(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Invs/S', { headers: reqHeader, params:param }).pipe(map(data => data));
  }

  getInvsOutByUser(UserId: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Invs/GetByUser/S?UserId='+UserId, { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  postInv() {
    return this.http.post(environment.ApiUrl + '/api/Invs', this.formData);
  }

  putInv() {
    return this.http.put(environment.ApiUrl + '/api/Invs/'+this.formData.InvID, this.formData);
  }


  deleteSaleInv(InvId:number) {
    return this.http.delete(environment.ApiUrl + '/api/Invs/' + InvId);
  }

  GetMaxInvsNo(): Observable<number> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Invs/GetMaxInvsNo', { headers: reqHeader }).pipe(map(data => <number>data));
  }

  getInvById(InvId : number): Observable<SalesInv> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Invs/GetSelectedInv/'+InvId, { headers: reqHeader }).pipe(map(data => <SalesInv>data));
  }

  

   
}
