import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CustSlides } from './../Models/cust-slides';

@Injectable({
  providedIn: 'root'
})
export class CustSlidesService {



  formData : CustSlides;
  constructor(private http: HttpClient) { }

  getCustSlides(): Observable<CustSlides[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/CustSlides', { headers: reqHeader }).pipe(map(data => <CustSlides[]>data));
  }

  getCustSlidesList(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/CustSlides/GetPages', { headers: reqHeader, params:param }).pipe(map(data => data));
  }

  // getCustSlidesListByEmpId(param,empId:string): any {
  //   //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
  //   const reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json', 'Authorization':
  //       'Bearer ' + localStorage.getItem('userToken')
  //   });
  //   return this.http.get(environment.ApiUrl + '/api/CustSlides/GetCustSlidesListByEmpId?empId='+empId, { headers: reqHeader, params:param }).pipe(map(data => data));
  // }

  

  postCustSlides() {
    return this.http.post(environment.ApiUrl + '/api/CustSlides', this.formData);
  }

  putCustSlides() {
    return this.http.put(environment.ApiUrl + '/api/CustSlides/'+this.formData.CustSlideId, this.formData);
  }

  deleteCustSlides(iD : number) {
    return this.http.delete(environment.ApiUrl + '/api/CustSlides/'+iD);
  }



  getCustSlidesById(CustId : number): Observable<CustSlides> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/CustSlides/'+CustId, { headers: reqHeader }).pipe(map(data => <CustSlides>data));
  }
}
