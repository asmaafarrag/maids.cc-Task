import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Governate } from '../Models/governate';

@Injectable({
  providedIn: 'root'
})
export class GovernateService {


  formData : Governate;
  constructor(private http: HttpClient) { }

  getGovernates(): Observable<Governate[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Governates', { headers: reqHeader }).pipe(map(data => <Governate[]>data));
  }

  getGovernatesPages(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Governates/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  
  
  postGovernates() {
    return this.http.post(environment.ApiUrl + '/api/Governates', this.formData);
  }

  putGovernates() {
    console.log(this.formData);
    return this.http.put(environment.ApiUrl + '/api/Governates/' + this.formData.GovernateId, this.formData);
  }

  deleteGovernates(Id:number) {
    return this.http.delete(environment.ApiUrl + '/api/Governates/' + Id);
  }


  getGovernatesById(Id: number): Observable<Governate> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Governates/' + Id, { headers: reqHeader }).pipe(map(data => <Governate>data));
  }

}

