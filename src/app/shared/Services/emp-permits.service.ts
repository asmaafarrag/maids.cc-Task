import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { PermitType } from "../Models/permit-type";
import { EmpPermits } from "../Models/emp-permits";
import { Emps } from "../Models/emps";

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpPermitsService {

  constructor(private http: HttpClient) { }

  formData : EmpPermits;

  getEmpPermits(EmpID: number): Observable<EmpPermits[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/GetEmpPermitsView/'+EmpID, { headers: reqHeader }).pipe(map(data => <EmpPermits[]>data));
  }


  getPermitTypes(): Observable<PermitType[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/PermitTypes', { headers: reqHeader }).pipe(map(data => <PermitType[]>data));
  }


  postEmpPermit() {
    return this.http.post(environment.ApiUrl + '/api/EmpPermits', this.formData);
  }

  ApproveEmpPermit(EmpPermitId : number,EmpRespId :number) {
    return this.http.post(environment.ApiUrl + '/api/ApproveEmpPermits/'+EmpPermitId+'/'+EmpRespId, EmpRespId);
  }

  RefuseEmpPermit(EmpPermitId : number,EmpRespId :number) {
    return this.http.post(environment.ApiUrl + '/api/RefuseEmpPermits/'+EmpPermitId+'/'+EmpRespId, EmpRespId);
  }



}
