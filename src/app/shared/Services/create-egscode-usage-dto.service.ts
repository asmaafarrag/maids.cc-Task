import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateEGSCodeUsageDTO } from '../Models/create-egscode-usage-dto';
@Injectable({
  providedIn: 'root'
})
export class CreateEGSCodeUsageDTOService {

  formData : CreateEGSCodeUsageDTO;
  constructor(private http: HttpClient) { }

  getCreateEGSCodeUsageDTOs(): Observable<CreateEGSCodeUsageDTO[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/CreateEGSCodeUsageDTOes', { headers: reqHeader }).pipe(map(data => <CreateEGSCodeUsageDTO[]>data));
  }

  getCreateEGSCodeUsageDTOsPages(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/CreateEGSCodeUsageDTOes/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  
  
  postCreateEGSCodeUsageDTO(ItemID:number) {
    return this.http.post(environment.ApiUrl + '/api/v1.0/EGS/requests/codes?ItemID='+ ItemID, this.formData);
  }

  // putCreateEGSCodeUsageDTO() {
  //   console.log(this.formData);
  //   return this.http.put(environment.ApiUrl + '/api/CreateEGSCodeUsageDTOes/' + this.formData., this.formData);
  // }

  deleteCreateEGSCodeUsageDTO(Id:number) {
    return this.http.delete(environment.ApiUrl + '/api/CreateEGSCodeUsageDTOes/' + Id);
  }


  getCreateEGSCodeUsageDTOById(Id: number): Observable<CreateEGSCodeUsageDTO> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/CreateEGSCodeUsageDTOes/' + Id, { headers: reqHeader }).pipe(map(data => <CreateEGSCodeUsageDTO>data));
  }

}
