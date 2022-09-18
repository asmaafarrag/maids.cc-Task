import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { TransBetStores,TransBetStoreDet } from '../Models/trans-bet-stores';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransBetStoresService {

  formData : TransBetStores;
  //transBetStoreDets : TransBetStoreDet[];

  constructor(private http: HttpClient) { }

  getTransBetStores(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/TransBetStores', { headers: reqHeader , params:param }).pipe(map(data => data));
  }
  getTransBetStoresByUser(UserId: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/TransBetStores/GetByUser/'+UserId, { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  postTransBetStores() {
    var body = {
      ...this.formData,
      transBetStoreDet:this.formData.transBetStoreDet
    };
    return this.http.post(environment.ApiUrl + '/api/TransBetStores', body);
  }

  putTransBetStores() {
    return this.http.put(environment.ApiUrl + '/api/TransBetStores/'+this.formData.TBSID, this.formData);
  }

  deleteTransBetStores(iD : number) {
    return this.http.delete(environment.ApiUrl + '/api/TransBetStores/'+iD);
  }


  GetMaxTransNo(): Observable<number> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/TransBetStores/GetMaxTransNo', { headers: reqHeader }).pipe(map(data => <number>data));
  }


  getTransBetStoresById(tbsId : number): Observable<TransBetStores> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/TransBetStores/'+tbsId, { headers: reqHeader }).pipe(map(data => <TransBetStores>data));
  }
  

}
