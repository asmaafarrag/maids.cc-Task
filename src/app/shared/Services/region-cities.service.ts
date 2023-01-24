import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegionCity } from '../Models/region-city';

@Injectable({
  providedIn: 'root'
})
export class RegionCitiesService {


  formData : RegionCity;
  constructor(private http: HttpClient) { }

  getRegionCities(): Observable<RegionCity[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/RegionCities', { headers: reqHeader }).pipe(map(data => <RegionCity[]>data));
  }

  getRegionCitiesGovernate(governateId: number): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/RegionCities?governateId='+ governateId, { headers: reqHeader}).pipe(map(data => data));
  }

  getRegionCitiesPages(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/RegionCities/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  
  
  postRegionCities() {
    return this.http.post(environment.ApiUrl + '/api/RegionCities', this.formData);
  }

  putRegionCities() {
    console.log(this.formData);
    return this.http.put(environment.ApiUrl + '/api/RegionCities/' + this.formData.RegionCityId, this.formData);
  }

  deleteRegionCities(Id:number) {
    return this.http.delete(environment.ApiUrl + '/api/RegionCities/' + Id);
  }


  getRegionCitiesById(Id: number): Observable<RegionCity> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/RegionCities/' + Id, { headers: reqHeader }).pipe(map(data => <RegionCity>data));
  }

}
  
