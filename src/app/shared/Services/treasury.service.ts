import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


import { Treasury } from '../Models/treasury';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreasuryService {


  constructor(private http: HttpClient){}

  getTreasurysByUser(User_ID:string): Observable<Treasury[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Treasuries?User_ID='+User_ID, { headers: reqHeader }).pipe(map(data => <Treasury[]>data));
  }

  getTreasurys(): Observable<Treasury[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Treasuries', { headers: reqHeader }).pipe(map(data => <Treasury[]>data));
  }
}
