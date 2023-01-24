import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActivityType } from '../Models/activity-type';

@Injectable({
  providedIn: 'root'
})
export class ActivityTypeService {

  formData : ActivityType;
  constructor(private http: HttpClient) { }

  getStageTypes(): Observable<ActivityType[]> {
   
    return this.http.get(environment.ApiUrl + '/api/ActivityTypes').pipe(map(data => <ActivityType[]>data));

  }
 
  getActivitySpecificTypes(): Observable<ActivityType[]> {
   
    return this.http.get(environment.ApiUrl + '/api/ActivityTypesbyEnterpriseID').pipe(map(data => <ActivityType[]>data));

  }
  

  // GetActivityTypesByEntrprise(EnterpriseID: number): Observable<ActivityType[]> {
  //   //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
  //   const reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json', 'Authorization':
  //       'Bearer ' + localStorage.getItem('userToken')
  //   });
  //   return this.http.get(environment.ApiUrl + '/api/ActivityTypesbyEnterpriseID?EnterpriseID='+EnterpriseID, { headers: reqHeader }).pipe(map(data => <ActivityType[]>data));
  // }

  getActivityType(): Observable<ActivityType[]> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    return this.http.get(environment.ApiUrl + '/api/ActivityTypes', { headers: reqHeader }).pipe(map(data => <ActivityType[]>data));
  }

  getActivityTypesPages(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/ActivityTypes/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  
  
  postActivityType() {
    return this.http.post(environment.ApiUrl + '/api/ActivityTypes', this.formData);
  }

  putActivityType() {
    return this.http.put(environment.ApiUrl + '/api/ActivityTypes/' + this.formData.ActivityTypeID, this.formData);
  }

  deleteActivityType(Id:number) {
    return this.http.delete(environment.ApiUrl + '/api/ActivityTypes/' + Id);
  }


  getActivityTypeById(Id: number): Observable<ActivityType> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/ActivityTypes/' + Id, { headers: reqHeader }).pipe(map(data => <ActivityType>data));
  }

}
