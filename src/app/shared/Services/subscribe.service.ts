import { SubscribePeriod } from './../Models/subscribe-period';
import { from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SubscribeRequest } from './../Models/subscribe-request';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  formData : SubscribeRequest;

  constructor(private http: HttpClient) { }


  getSubscribePeriods(): Observable<SubscribePeriod[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SubscribePeriods', { headers: reqHeader }).pipe(map(data => <SubscribePeriod[]>data));
  }



  getSubscribeRequestsByUser(Id:string): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    console.log(Id)
    return this.http.get(environment.ApiUrl + '/api/SubscribeRequestsByUser/' + Id, { headers: reqHeader }).pipe(map(data => data));
  }

  getSubscribeRequestsByUserCloseToEnd(Id:string): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    console.log(Id)
    return this.http.get(environment.ApiUrl + '/api/SubscribeRequestsByUserCloseToEnd/' + Id, { headers: reqHeader }).pipe(map(data => data));
  }

  getSubscribeRequestsWaiting(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SubscribeRequests/GetSubscribeRequestsWaiting', { headers: reqHeader, params:param }).pipe(map(data => data));
  }

  getSubscribeRequestsPaid(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SubscribeRequests/GetSubscribeRequestsPaid', { headers: reqHeader, params:param }).pipe(map(data => data));
  }

  getSubscribeRequestsAlarm(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SubscribeRequests/SubscribeRequestsAlarm', { headers: reqHeader, params:param }).pipe(map(data => data));
  }


  postSubscribeRequest() {
    return this.http.post(environment.ApiUrl + '/api/SubscribeRequests', this.formData);
  }

  putSubscribeRequestsPaid(Id:number) {
    return this.http.put(environment.ApiUrl + '/api/SubscribeRequestsPaid/'+Id, this.formData);
  }

  putSubscribeRequestsCancel(Id:number) {
    return this.http.put(environment.ApiUrl + '/api/SubscribeRequestsCancel/'+Id, this.formData);
  }

 

  // deleteSubscribeRequest(iD : number) {
  //   return this.http.delete(environment.ApiUrl + '/api/SubscribeRequests/'+iD);
  // }


  getSubscribeRequestById(Id : number): Observable<SubscribeRequest> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/SubscribeRequests/'+ Id, { headers: reqHeader }).pipe(map(data => <SubscribeRequest>data));
  }

}
