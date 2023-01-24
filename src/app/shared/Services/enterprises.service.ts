import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Enterprises } from '../Models/enterprises';

@Injectable({
  providedIn: 'root'
})
export class Enterpriseservice {

 
  formData : Enterprises;
  constructor(private http: HttpClient) { }

  getEnterprises(): Observable<Enterprises[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Enterprises', { headers: reqHeader }).pipe(map(data => <Enterprises[]>data));
  }

  getEnterprisesPages(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Enterprises/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  
  
  postEnterprises() {
    return this.http.post(environment.ApiUrl + '/api/Enterprises', this.formData);
  }

  putEnterprises() {
    console.log(this.formData);
    return this.http.put(environment.ApiUrl + '/api/Enterprises/' + this.formData.EnterpriseClientId, this.formData);
  }

  deleteEnterprises(Id:number) {
    return this.http.delete(environment.ApiUrl + '/api/Enterprises/' + Id);
  }


  getEnterprisesById(Id: number): Observable<Enterprises> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Enterprises/' + Id, { headers: reqHeader }).pipe(map(data => <Enterprises>data));
  }

}
