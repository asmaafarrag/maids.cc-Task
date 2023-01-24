import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { CustomerCount } from '../Models/customer-count';
import { SupplierCount } from '../Models/supplier-count';
import { MonthSellings } from '../Models/month-sellings';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  //readonly rootUrl = 'http://104.196.134.107/AfitAPI';
  //readonly rootUrl = 'http://localhost:22376';

  constructor(private http: HttpClient) { }

  get_Customer_Count(): Observable<CustomerCount> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/V_Customer_Count', { headers: reqHeader }).pipe(map(data => <CustomerCount>data));
  } 

  get_Supplier_Count(): Observable<SupplierCount> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/V_Supplier_Count', { headers: reqHeader }).pipe(map(data => <SupplierCount>data));
  }

  get_item_Count(): Observable<SupplierCount> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/V_ItemsCount', { headers: reqHeader }).pipe(map(data => <SupplierCount>data));
  }

  get_Selling_Count(): Observable<SupplierCount> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/V_sellingCount', { headers: reqHeader }).pipe(map(data => <SupplierCount>data));
  }

  get_SellingRet_Count(): Observable<SupplierCount> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/V_SellingRetsCount', { headers: reqHeader }).pipe(map(data => <SupplierCount>data));
  }



  get_user_Count(): Observable<SupplierCount> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/V_UsersCount' , { headers: reqHeader }).pipe(map(data => <SupplierCount>data));
  }

  
  getMonthSellings() : Observable<MonthSellings[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/V_Month_Sellings', { headers: reqHeader }).pipe(map(data => <MonthSellings[]>data));
  }
  
}
