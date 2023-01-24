import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Selling } from '../Models/selling';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellingService {

  //readonly rootUrl = 'http://104.196.134.107/AfitAPI';
  //readonly rootUrl = 'http://localhost:22376';
 
 constructor(private http: HttpClient) { }

 getTopTenSellings(): Observable<Selling[]> {
  //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
  const reqHeader = new HttpHeaders({
    'Content-Type': 'application/json', 'Authorization':
      'Bearer ' + localStorage.getItem('userToken')
  });
  return this.http.get(environment.ApiUrl + '/api/Sellings/GetLastSellings?PageSize=10', { headers: reqHeader }).pipe(map(data => <Selling[]>data));
}

}
