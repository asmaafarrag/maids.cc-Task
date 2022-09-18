import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RealStateReserveUnits } from '../Models/real-state-reserve-units';

@Injectable({
  providedIn: 'root'
})
export class RealStateReserveUnitsService {

  formData : RealStateReserveUnits;

  constructor(private http: HttpClient) { }

  getReserveUnits(): Observable<RealStateReserveUnits[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/ReservedUnits', { headers: reqHeader }).pipe(map(data => <RealStateReserveUnits[]>data));
  }
}
