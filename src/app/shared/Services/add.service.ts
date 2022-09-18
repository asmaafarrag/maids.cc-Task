import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Add } from '../Models/add';


import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddService {
  formData : Add;
  constructor(private http: HttpClient) { }

  getAdds(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Adds', { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  
  getAddsByUser(UserId: string,param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Adds/GetByUser/'+UserId, { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  postAdd() {
    var body = {
      ...this.formData,
      addDets: this.formData.addDets
    };
    return this.http.post(environment.ApiUrl + '/api/Adds', body);
  }

  putAdd() {
    return this.http.put(environment.ApiUrl + '/api/Adds/' + this.formData.AddID, this.formData);
  }

  deleteAdd(AddId:number) {
    return this.http.delete(environment.ApiUrl + '/api/Adds/' + AddId);
  }


  getAddById(saleInvId: number): Observable<Add> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Adds/' + saleInvId, { headers: reqHeader }).pipe(map(data => <Add>data));
  }

}
