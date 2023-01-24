import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { DocumentInvoice } from '../Models/document-invoice';
import { EtaUser } from '../Models/eta-user';

@Injectable({
  providedIn: 'root'
})
export class ETAService {

  User : EtaUser;
  constructor(private http: HttpClient) { }

  Login (clientId : string, clientSecret : string , EInvMode : string ) {
    this.User = {client_id : clientId,client_secret : clientSecret , EInvMode : EInvMode  }

    //const data = 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret +'&scope=InvoicingAPI';
    //const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
    //return this.http.post(environment.ApiUrl + '/api/User/ETALogin', data, { headers: reqHeader });
    return this.http.post(environment.ApiUrl + '/api/EInvoice/ETALogin?EInvMode='+ EInvMode  , this.User);
  }

  SubmitInvoice(formData : DocumentInvoice){
    return this.http.post(environment.EtaUrl + '/api/v1/documentsubmissions', formData);
  }


}
