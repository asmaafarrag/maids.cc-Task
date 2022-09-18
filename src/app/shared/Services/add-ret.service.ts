import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AddRet } from '../Models/add-ret';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddRetService {
  formData : AddRet;
  constructor(private http: HttpClient) { }

  getAddRets(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/AddRets', { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  getAddRetsByUser(UserId: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/AddRets/GetByUser/'+UserId, { headers: reqHeader, params: param }).pipe(map(data => data));
  }


  postAddRet() {
    var body = {
      ...this.formData,
      addRetDets: this.formData.addRetDets
    };
    return this.http.post(environment.ApiUrl + '/api/AddRets', body);
  }

  putAddRet() {
    return this.http.put(environment.ApiUrl + '/api/AddRets/' + this.formData.AddRetID, this.formData);
  }

  deleteAddRet(AddRetId:number) {
    return this.http.delete(environment.ApiUrl + '/api/AddRets/' + AddRetId);
  }


  getAddRetById(saleInvId: number): Observable<AddRet> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/AddRets/' + saleInvId, { headers: reqHeader }).pipe(map(data => <AddRet>data));
  }

}
