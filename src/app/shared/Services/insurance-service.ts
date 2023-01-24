import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Insuranceoffice } from '../Models/insuranceoffice-model';


@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
 
  formData : Insuranceoffice;
  constructor(private http: HttpClient) { }

  getOffices(): Observable<Insuranceoffice[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/offices', { headers: reqHeader }).pipe(map(data => <Insuranceoffice[]>data));
  }

  getOfficePages(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/InsuranceOffices/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  
  
  postOffice() {
    return this.http.post(environment.ApiUrl + '/api/InsuranceOffices', this.formData);
  }

  putOffice() {
    console.log(this.formData);
    return this.http.put(environment.ApiUrl + '/api/InsuranceOffices/' + this.formData.InsuranceOfficeID, this.formData);
  }

  deleteOffice(Id:number) {
    return this.http.delete(environment.ApiUrl + '/api/InsuranceOffices/' + Id);
  }


  getOfficeById(Id: number): Observable<Insuranceoffice> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/InsuranceOffices/' + Id, { headers: reqHeader }).pipe(map(data => <Insuranceoffice>data));
  }

}
