import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from '../Models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  formData : Country;
  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Countries', { headers: reqHeader }).pipe(map(data => <Country[]>data));
  }

  getCountriesPages(param): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Countries/GetPages', { headers: reqHeader, params: param }).pipe(map(data => data));
  }
  
  
  postCountry() {
    return this.http.post(environment.ApiUrl + '/api/Countries', this.formData);
  }

  putCountry() {
    return this.http.put(environment.ApiUrl + '/api/Countries/' + this.formData.CountryID, this.formData);
  }

  deleteCountry(Id:number) {
    return this.http.delete(environment.ApiUrl + '/api/Countries/' + Id);
  }


  getCountryById(Id: number): Observable<Country> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Countries/' + Id, { headers: reqHeader }).pipe(map(data => <Country>data));
  }

}

