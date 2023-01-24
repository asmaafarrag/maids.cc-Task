import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Currency } from '../Models/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  formData : Currency;
  constructor(private http: HttpClient) { }


  getCurrency(): Observable<Currency[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Currencies', { headers: reqHeader }).pipe(map(data => <Currency[]>data));
  }

}
