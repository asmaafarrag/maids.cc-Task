import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CRMStageTypes } from '../Models/crm-stage-types';

@Injectable({
  providedIn: 'root'
})
export class CRMStageTypesService {

  formData : CRMStageTypes;

  constructor(private http: HttpClient) { }

  getStageTypes(): Observable<CRMStageTypes[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/StageTypes', { headers: reqHeader }).pipe(map(data => <CRMStageTypes[]>data));
  }
}
