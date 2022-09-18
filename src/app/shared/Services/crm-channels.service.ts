import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CRMChannels } from '../Models/crm-channels';

@Injectable({
  providedIn: 'root'
})
export class CRMChannelsService {

  formData : CRMChannels;

  constructor(private http: HttpClient) { }

  getChannels(): Observable<CRMChannels[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Channels', { headers: reqHeader }).pipe(map(data => <CRMChannels[]>data));
  }

  postChannel() {
    return this.http.post(environment.ApiUrl + '/api/Channels', this.formData);
  }

  putChannel() {
    return this.http.put(environment.ApiUrl + '/api/Channels/'+this.formData.ChannelID, this.formData);
  }

  deleteChannel() {
    return this.http.delete(environment.ApiUrl + '/api/Channels/'+this.formData.ChannelID);
  }
}
