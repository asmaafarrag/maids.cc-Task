import { from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Supplier } from '../Models/supplier';


import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  formData : Supplier;

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<Supplier[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Suppliers', { headers: reqHeader }).pipe(map(data => <Supplier[]>data));
  }

  
  getSuppliersByEmpId(empId:string): Observable<Supplier[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Suppliers/GetSuppliersbyEmpId?empId='+empId, { headers: reqHeader }).pipe(map(data => <Supplier[]>data));
  }

  getSuppliersList(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Suppliers/GetSuppliersList', { headers: reqHeader, params:param }).pipe(map(data => data));
  }

  getSuppliersListyByEmpId(param,empId:string): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Suppliers/GetSuppliersListListByEmpId?empId='+empId, { headers: reqHeader, params:param }).pipe(map(data => data));

  }
  

  
  postSupplier() {
    return this.http.post(environment.ApiUrl + '/api/Suppliers', this.formData);
  }

  putSupplier() {
    return this.http.put(environment.ApiUrl + '/api/Suppliers/'+this.formData.SupplierId, this.formData);
  }

  deleteSupplier(iD : number) {
    return this.http.delete(environment.ApiUrl + '/api/Suppliers/'+iD);
  }



  getSupplierById(SuppId : number): Observable<Supplier> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    console.log(SuppId);
    return this.http.get(environment.ApiUrl + '/api/Suppliers/'+SuppId, { headers: reqHeader }).pipe(map(data => <Supplier>data));
  }


}
