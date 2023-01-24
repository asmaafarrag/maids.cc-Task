import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserType } from '../Models/user-type';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  formData : UserType;
  constructor(private http: HttpClient) { }

  getUserType(): Observable<UserType[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/UserTypes', { headers: reqHeader }).pipe(map(data => <UserType[]>data));
  }

  


 
}
