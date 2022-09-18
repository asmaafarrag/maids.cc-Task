import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CRMClients } from '../Models/crm-clients';



declare var require: any;



@Injectable({
  providedIn: 'root'
})
export class CRMClientsService {

  formData : CRMClients;

  constructor(private http: HttpClient) { }


  getClientss(): Observable<CRMClients[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Clients', { headers: reqHeader }).pipe(map(data => <CRMClients[]>data));
  }

  //getClients(): Observable<CRMClients[]> {
    getClients(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Clients/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  getClientsByEmp(EmpId:string): Observable<CRMClients[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Clients/GetClientsByEmpID/'+EmpId, { headers: reqHeader }).pipe(map(data => <CRMClients[]>data));
  }

  getStageClients(stageId:number): Observable<CRMClients[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Clients/stage/'+stageId, { headers: reqHeader }).pipe(map(data => <CRMClients[]>data));
  }

  getStageClientsByEmp(stageId:number,EmpId:string): Observable<CRMClients[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Clients/stage/'+stageId+'?EmpID='+EmpId, { headers: reqHeader }).pipe(map(data => <CRMClients[]>data));
  }

  getStageTypeClients(stageTypeId:number): Observable<CRMClients[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Clients/stageType/'+stageTypeId, { headers: reqHeader }).pipe(map(data => <CRMClients[]>data));
  }

  getStageTypeClientsByEmp(stageTypeId:number,EmpId:string): Observable<CRMClients[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Clients/stageByEmp/'+stageTypeId+'?EmpID='+EmpId, { headers: reqHeader }).pipe(map(data => <CRMClients[]>data));
  }

  GetEmpAlertsList(EmpId:number): Observable<CRMClients[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Clients/AlertsList?EmpId='+EmpId, { headers: reqHeader }).pipe(map(data => <CRMClients[]>data));
  }

  GetAdminAlertsList(): Observable<CRMClients[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Clients/AdminAlertsList', { headers: reqHeader }).pipe(map(data => <CRMClients[]>data));
  }
  

  GetEmpAlertsDelayList(EmpId:number): Observable<CRMClients[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Clients/AlertsDelayList?EmpId='+EmpId, { headers: reqHeader }).pipe(map(data => <CRMClients[]>data));
  }

  getClientById(clientId : number): Observable<CRMClients> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Clients/'+clientId, { headers: reqHeader }).pipe(map(data => <CRMClients>data));
  }

  postClient() {
    return this.http.post(environment.ApiUrl + '/api/Clients', this.formData);
  }

  putClient() {
    return this.http.put(environment.ApiUrl + '/api/Clients/'+this.formData.ClientID, this.formData);
  }

  putClientList(ItemsList :CRMClients[]) {
    console.log(ItemsList , 'ItemsList777')
     return this.http.put(environment.ApiUrl + '/api/Client/PutClientChangeEmp' , ItemsList);
  }  



  deleteClient(clientId : number) {
    return this.http.delete(environment.ApiUrl + '/api/Clients/'+clientId);
  }
}
