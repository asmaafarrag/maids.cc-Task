import { from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DocumentSummaryDTO } from '../Models/document-summary-dto';

@Injectable({
  providedIn: 'root'
})
export class AllInvService {

  formData : DocumentSummaryDTO;
  constructor(private http: HttpClient) { }

  getDocumentSummaryDTO(): Observable<DocumentSummaryDTO[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/v1.0/documents/recent', { headers: reqHeader }).pipe(map(data => <DocumentSummaryDTO[]>data));
  }
}
