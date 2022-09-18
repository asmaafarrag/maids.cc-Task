import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CRMClientActions } from '../Models/crm-client-actions';

@Injectable({
  providedIn: 'root'
})
export class CRMClientActionsService {

  formData : CRMClientActions;

  constructor(private http: HttpClient) { }

  getClientActions(): Observable<CRMClientActions[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/ClientActions', { headers: reqHeader }).pipe(map(data => <CRMClientActions[]>data));
  }

  getClientActionsByClientID(clientId : string): Observable<CRMClientActions[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/ClientActionsByClientID?ClientID='+clientId, { headers: reqHeader }).pipe(map(data => <CRMClientActions[]>data));
  }
  


  postClientActions() {
    return this.http.post(environment.ApiUrl + '/api/ClientActions', this.formData);
  }

  putClientActions() {
    return this.http.put(environment.ApiUrl + '/api/ClientActions/'+this.formData.ActionID, this.formData);
  }

  deleteClientActions() {
    return this.http.delete(environment.ApiUrl + '/api/ClientActions/'+this.formData.ActionID);
  }
}
