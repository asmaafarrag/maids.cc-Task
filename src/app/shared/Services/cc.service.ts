
import { from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CC } from '../Models/cc';

@Injectable({
  providedIn: 'root'
})
export class CCService {

  constructor(private http: HttpClient) { }

  getCCs(): Observable<CC[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/CCs', { headers: reqHeader }).pipe(map(data => <CC[]>data));
  }
}
