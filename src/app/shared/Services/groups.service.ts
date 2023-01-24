import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Groups } from '../Models/groups';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  formData : Groups;
  constructor(private http: HttpClient) { }

  getGroups(): Observable<Groups[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Groups', { headers: reqHeader }).pipe(map(data => <Groups[]>data));
  }

  getGroupsPages(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Groups/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  
  
  postGroup() {
    return this.http.post(environment.ApiUrl + '/api/Groups', this.formData);
  }

  putGroup() {
    console.log(this.formData);
    return this.http.put(environment.ApiUrl + '/api/Groups/' + this.formData.GroupID, this.formData);
  }

  deleteGroup(Id:number) {
    return this.http.delete(environment.ApiUrl + '/api/Groups/' + Id);
  }


  getGroupById(Id: number): Observable<Groups> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Groups/' + Id, { headers: reqHeader }).pipe(map(data => <Groups>data));
  }

}
