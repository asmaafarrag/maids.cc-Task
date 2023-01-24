import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BranchUser } from '../Models/branch-user';
  @Injectable({
    providedIn: 'root'
  })
  export class BranchUserService {

    formData : BranchUser;
    constructor(private http: HttpClient) { }

    getuser(): Observable<BranchUser[]> {
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization':
          'Bearer ' + localStorage.getItem('userToken')
      });
      return this.http.get(environment.ApiUrl + '/api/Users/get-users-drop-down-list', { headers: reqHeader }).pipe(map(data => <BranchUser[]>data));
    }

    // registerEInvoiceBranchUser(userr: BranchUser) {
    //   const body: BranchUser = {
    //     EnterpriseId: userr.EnterpriseId,
    //     UserLog: userr.UserLog,
    //     PSWRD: userr.PSWRD,
    //     UserType :userr.UserType,
    //     UserId:userr.UserId,
    //     UserTypeId:userr.UserTypeId,
    //   };
    //   const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    //   return this.http.post(environment.ApiUrl + '/api/User/EInvoiceRegister', body, { headers: reqHeader });
    // }

    getuserPages(param): any {
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization':
          'Bearer ' + localStorage.getItem('userToken')
      });
      return this.http.get(environment.ApiUrl + '/api/Users/get-users-with-pagination', { headers: reqHeader, params: param }).pipe(map(data => data));
    }


    // postBranchUser() {
    //   return this.http.post(environment.ApiUrl + '/api/Users/EInvUser', this.formData);
    // }



    // postUser() {
    //   return this.http.post(environment.ApiUrl + '/api/Users', this.formData);
    // }


    putBranchUser() {
      console.log(this.formData);
      return this.http.put(environment.ApiUrl + '/api/Users/update-user/' + this.formData.id, this.formData);
    }

    // deleteBranchUser(Id:number) {
    //   return this.http.delete(environment.ApiUrl + '/api/Users/' + Id);
    // }


    getBranchUserById(Id: number): Observable<BranchUser> {
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization':
          'Bearer ' + localStorage.getItem('userToken')
      });
      return this.http.get(environment.ApiUrl + '/api/Users/get-user-by-id/' + Id, { headers: reqHeader }).pipe(map(data => <BranchUser>data));
    }

  }

