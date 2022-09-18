import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { VacOrders } from "../Models/vac-orders";
import { VacOrdersView } from "../Models/vac-orders-view";
import { Emps } from "../Models/emps";

import { environment } from 'src/environments/environment';
import { Vacs } from '../Models/vacs';
import { EmpVacBal } from '../Models/emp-vac-bal';

@Injectable({
  providedIn: 'root'
})
export class VacOrdersService {

  constructor(private http: HttpClient) { }

  formData : VacOrders;
  
  getVacOrders(EmpID: number): Observable<VacOrdersView[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/GetVacOrdersView/'+EmpID, { headers: reqHeader }).pipe(map(data => <VacOrdersView[]>data));
  }

  getEmps(): Observable<Emps[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Emps', { headers: reqHeader }).pipe(map(data => <Emps[]>data));
  }

  getVacs(): Observable<Vacs[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Vacs', { headers: reqHeader }).pipe(map(data => <Vacs[]>data));
  }

  getSelectedEmps(EmpID : number ): Observable<Emps[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Emps/'+EmpID, { headers: reqHeader }).pipe(map(data => <Emps[]>data));
  }

  getChildEmps(EmpID : number ): Observable<Emps[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/GetChildEmps/'+EmpID, { headers: reqHeader }).pipe(map(data => <Emps[]>data));
  }

  postVacOrder() {
    return this.http.post(environment.ApiUrl + '/api/VacOrders', this.formData);
  }

  ApproveVacOrder(VacOrderId : number) {
    return this.http.post(environment.ApiUrl + '/api/ApproveVacOrder/'+VacOrderId, VacOrderId);
  }

  ApproveRequest(RequestId : number,RequestType : string,EmpRespId : number) {
    return this.http.post(environment.ApiUrl + '/api/ApproveRequest/'+RequestId+'/'+RequestType+'/'+EmpRespId, RequestId);
  }

  RefuseRequest(RequestId : number,RequestType : string,EmpRespId : number) {
    return this.http.post(environment.ApiUrl + '/api/RefuseRequest/'+RequestId+'/'+RequestType+'/'+EmpRespId, RequestId);
  }

  getEmpVacRep(EmpID : number,fromDate: string,toDate: string): Observable<VacOrdersView[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/GetVacOrdersRep?EmpID='+EmpID+'&fromDate='+fromDate+'&toDate='+toDate, { headers: reqHeader }).pipe(map(data => <VacOrdersView[]>data));
  }

  getEmpVacBal(EmpID : number): Observable<EmpVacBal[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/GetEmployeeVacBal?EmpID='+EmpID, { headers: reqHeader }).pipe(map(data => <EmpVacBal[]>data));
  }

}

