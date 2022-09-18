import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Unit } from '../Models/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  formData : Unit;
  constructor(private http: HttpClient) { }

  getUNITs(): Observable<Unit[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/UNITs', { headers: reqHeader }).pipe(map(data => <Unit[]>data));
  }

  getUNITsPages(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/UNITs/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  
  
  postUnit() {
    return this.http.post(environment.ApiUrl + '/api/UNITs', this.formData);
  }

  putUnit() {
    return this.http.put(environment.ApiUrl + '/api/UNITs/' + this.formData.UNITID, this.formData);
  }

  deleteUnit(Id:number) {
    return this.http.delete(environment.ApiUrl + '/api/UNITs/' + Id);
  }


  getUNITsId(Id: number): Observable<Unit> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/UNITs/' + Id, { headers: reqHeader }).pipe(map(data => <Unit>data));
  }

}
