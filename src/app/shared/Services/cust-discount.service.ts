import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CustDiscount } from '../Models/cust-discount';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustDiscountService {

  formData : CustDiscount;
  constructor(private http: HttpClient) { }

  GetMaxInvsNo(): Observable<number> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/CustDiscounts/GetMaxNo', { headers: reqHeader }).pipe(map(data => <number>data));
  }

  getCustDiscountsList(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/CustDiscounts', { headers: reqHeader, params:param }).pipe(map(data => data));
  }


  postCustDiscount() {
    return this.http.post(environment.ApiUrl + '/api/CustDiscounts', this.formData);
  }

  putCustDiscount() {
    return this.http.put(environment.ApiUrl + '/api/CustDiscounts/'+this.formData.CustDiscountId, this.formData);
  }

  deleteCustDiscount(iD : number) {
    return this.http.delete(environment.ApiUrl + '/api/CustDiscounts/'+iD);
  }

  getCustDiscountById(CustDiscId : number): Observable<CustDiscount> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/CustDiscounts/'+CustDiscId, { headers: reqHeader }).pipe(map(data => <CustDiscount>data));
  }
}
