import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../Models/user.model';
import { LocalUser } from '../Models/Local-User.model'

import { environment } from 'src/environments/environment';
import { AccountUser } from '../Models/account-user';
import { BranchUser } from '../Models/branch-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //readonly rootUrl = 'http://104.196.134.107/AfitAPI';
  //readonly rootUrl = 'http://localhost:22376';

  constructor(private http: HttpClient) { }

  formData:AccountUser;


  // userAuthentication(customerInfoSerial: string, userName: string) {
  //   const data = 'username=' + customerInfoSerial + '&password=' + userName + '&grant_type=password';
  //   const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
  //   return this.http.post(environment.ApiUrl + '/token', data, { headers: reqHeader });
  // }

  userAuthentication (username : string , password : string) {
    const data = '{ "EmailOrPhone":"' + username + '","Password":"' + password+'"}' ;

    const body: LocalUser = {
      EmailOrPhone: username,
      Password: password

    };
console.log(body);
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.http.post(environment.ApiUrl + '/api/users/login', body, { headers: reqHeader });
  }

  getUserClaims() {
    //const UserInfo: any  = this.http.get(this.rootUrl + '/api/GetUserClaims');
    const UserInfo: any = this.http.get(environment.ApiUrl + '/api/GetUserClaims');
    return UserInfo;
    // id don't need this line since the HttpInterceptor will added to the header
    // , { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')})}
  }

  isLoggedIn() {
    if (localStorage.getItem('userToken') != null && localStorage.getItem('UserType') != null) {
      return true;
    }
  }

  registerUser(user: User) {
    const body: User = {
      UserId: null,
      UserName: user.UserName,
      Password: user.UserName,
      FirstName: user.FirstName,
      LastName: user.LastName,
      CustomerInfoConnStr: user.CustomerInfoConnStr
    };
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(environment.ApiUrl + '/api/User/Register', body, { headers: reqHeader });
  }

  registerEInvoiceUser(user: AccountUser) {
    const body: AccountUser = {
      // EnterpriseName: user.EnterpriseName,
      // RegistrationNumber: user.RegistrationNumber,
      // UserLog: user.UserLog,
      // PSWRD: user.PSWRD,
      // EnterpriseClientIdActive :user.EnterpriseClientIdActive,
      // EnterpriseClientId :user.EnterpriseClientId,
      // EnterpriseClientSecret :user.EnterpriseClientSecret,
      // EnterpriseClientSecretActive :user.EnterpriseClientSecretActive,
      // ActivityTypelist:user.ActivityTypelist
      name:user.name,
      emailOrPhone:user.emailOrPhone,
      password:user.password,
    };
    console.log(body , "body")
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    // const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(environment.ApiUrl + '/api/Users/register', body, { headers: reqHeader });
  }

  // registerEInvoiceBranchUser(userr: BranchUser) {
  //   const body: BranchUser = {
  //     EnterpriseId: userr.EnterpriseId,
  //     UserLog: userr.UserLog,
  //     PSWRD: userr.PSWRD,
  //     UserType :userr.UserType
  //   };
  //   const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
  //   return this.http.post(environment.ApiUrl + '/api/User/EInvoiceRegister', body, { headers: reqHeader });
  // }

  getGetLocalUser(UserName: string, PSWRD: string): Observable<LocalUser[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Users/login?UserName=' + UserName + '&PSWRD=' + PSWRD, { headers: reqHeader }).pipe(map(data => <LocalUser[]>data));
  }



  getGetUserEinvoice(UserName: string, PSWRD: string , RegistrationNumber :string): Observable<LocalUser[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/GetUserEinvoice?UserName=' + UserName + '&PSWRD=' + PSWRD + '&RegistrationNumber=' + RegistrationNumber, { headers: reqHeader }).pipe(map(data => <LocalUser[]>data));
  }



  getUserRoles() {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    const UserInfo: any = this.http.get(environment.ApiUrl + '/api/GetUserRoles', { headers: reqHeader });
    return UserInfo;
  }
}
