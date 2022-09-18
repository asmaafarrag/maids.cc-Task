import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RealStateHouses } from '../Models/real-state-houses';

@Injectable({
  providedIn: 'root'
})
export class RealStateHousesService {

  formData : RealStateHouses;

  constructor(private http: HttpClient) { }

  getHouses(): Observable<RealStateHouses[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/V_Houses', { headers: reqHeader }).pipe(map(data => <RealStateHouses[]>data));
  }

}
