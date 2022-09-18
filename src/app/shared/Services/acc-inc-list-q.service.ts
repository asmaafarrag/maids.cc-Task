import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AccInc, AccIncListQ } from '../Models/acc-inc-list-q.model'
import { Statement } from '../Models/statement.model';
import { Accounts } from '../Models/accounts.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccIncListQService {

  //readonly rootUrl = 'http://104.196.134.107/AfitAPI';
  //readonly rootUrl = 'http://localhost:22376';
 
  constructor(private http: HttpClient) { }

  getAccIncListQ(Quarter: number): Observable<AccInc> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/AccIncListQ?Quarter='+Quarter, { headers: reqHeader }).pipe(map(data => <AccInc>data));
  }

  getStatement(Account_Id: string,fromDate: string,toDate: string): Observable<Statement[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Statement?Account_Id='+Account_Id+'&fromDate='+fromDate+'&toDate='+toDate, { headers: reqHeader }).pipe(map(data => <Statement[]>data));
  }

  getAccounts(User_ID:string): Observable<Accounts[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Accounts?User_ID='+User_ID, { headers: reqHeader }).pipe(map(data => <Accounts[]>data));
  }

  getAllAccounts(): Observable<Accounts[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Accounts', { headers: reqHeader }).pipe(map(data => <Accounts[]>data));
  }

  getAccount(User_ID:string): Observable<Accounts[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Accounts/GetByUser/GetAllAccountsExceptOfOthers?User_Id=' + User_ID, { headers: reqHeader }).pipe(map(data => <Accounts[]>data));
  }
}
