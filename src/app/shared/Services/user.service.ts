import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../Models/user.model';
import { LocalUser } from '../Models/Local-User.model'

import { environment } from 'src/environments/environment';


@Injectable({ 
  providedIn: 'root'
})
export class UserService {

  //readonly rootUrl = 'http://104.196.134.107/AfitAPI';
  //readonly rootUrl = 'http://localhost:22376';

  constructor(private http: HttpClient) { }

  userAuthentication (customerInfoSerial : string) {
    const data = 'username=' + customerInfoSerial + '&password=' + customerInfoSerial +'&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    return this.http.post(environment.ApiUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims() {
    //const UserInfo: any  = this.http.get(this.rootUrl + '/api/GetUserClaims');
    const UserInfo: any  = this.http.get(environment.ApiUrl + '/api/GetUserClaims');
    return UserInfo;
    // id don't need this line since the HttpInterceptor will added to the header
    // , { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})}
  }

  isLoggedIn() {
    if (localStorage.getItem('userToken') != null  && localStorage.getItem('UserType') != null) {
      return true;
    }
  }

  registerUser(user: User) {
    const body: User = {
      UserId : null,
      UserName: user.UserName,
      Password: user.UserName,
      FirstName: user.FirstName,
      LastName: user.LastName,
      CustomerInfoConnStr: user.CustomerInfoConnStr
    };
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(environment.ApiUrl + '/api/User/Register', body, { headers: reqHeader });
  }

  getGetLocalUser(UserName: string , PSWRD : string) : Observable<LocalUser[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/User?UserName='+UserName+'&PSWRD='+PSWRD, { headers: reqHeader }).pipe(map(data => <LocalUser[]>data));
  }

  

  getUserRoles()  {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    const UserInfo: any  = this.http.get(environment.ApiUrl + '/api/GetUserRoles',{ headers: reqHeader });
    return UserInfo;
  }
}
