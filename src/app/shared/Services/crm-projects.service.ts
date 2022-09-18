import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CRMProjects } from '../Models/crm-projects';

@Injectable({
  providedIn: 'root'
})
export class CRMProjectsService {

  formData : CRMProjects;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<CRMProjects[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Projects', { headers: reqHeader }).pipe(map(data => <CRMProjects[]>data));
  }

  getProjectById(projectId : number): Observable<CRMProjects> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Projects/'+projectId, { headers: reqHeader }).pipe(map(data => <CRMProjects>data));
  }
  

  postProject() {
    return this.http.post(environment.ApiUrl + '/api/Projects', this.formData);
  }

  putProject() {
    return this.http.put(environment.ApiUrl + '/api/Projects/'+this.formData.ProjectID, this.formData);
  }

  deleteProject(ProjectID : number) {
    return this.http.delete(environment.ApiUrl + '/api/Projects/'+ProjectID);
  }
}
