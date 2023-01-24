import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Branch } from '../Models/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  formData : Branch;
  constructor(private http: HttpClient) { }

  getBranchs(): Observable<Branch[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Branches', { headers: reqHeader }).pipe(map(data => <Branch[]>data));
  }

  getBranchsPages(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Branches/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  
  
  postBranch() {
    return this.http.post(environment.ApiUrl + '/api/Branches', this.formData);
  }

  putBranch() {
    console.log(this.formData);
    return this.http.put(environment.ApiUrl + '/api/Branches/' + this.formData.BranchId, this.formData);
  }

  deleteBranch(Id:number) {
    return this.http.delete(environment.ApiUrl + '/api/Branches/' + Id);
  }


  getBranchById(Id: number): Observable<Branch> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Branches/' + Id, { headers: reqHeader }).pipe(map(data => <Branch>data));
  }

}

