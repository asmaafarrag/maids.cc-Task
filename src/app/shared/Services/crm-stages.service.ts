import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CRMStages } from '../Models/crm-stages';

@Injectable({
  providedIn: 'root'
})
export class CRMStagesService {

  formData : CRMStages;

  constructor(private http: HttpClient) { }

  getStages(): Observable<CRMStages[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Stages', { headers: reqHeader }).pipe(map(data => <CRMStages[]>data));
  }

  postStage() {
    return this.http.post(environment.ApiUrl + '/api/Stages', this.formData);
  }

  putStage() {
    return this.http.put(environment.ApiUrl + '/api/Stages/'+this.formData.StageID, this.formData);
  }

  deleteStage() {
    return this.http.delete(environment.ApiUrl + '/api/Stages/'+this.formData.StageID);
  }
}
