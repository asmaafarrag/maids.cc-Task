import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Customer } from '../Models/customer.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  formData : Customer;
  constructor(private http: HttpClient) { }

  getCustomersList(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    // return this.http.get(environment.ApiUrl + '/api/Customers/get-customers-with-pagination', { headers: reqHeader, params: param , observe: 'response' });
    return this.http.get(environment.ApiUrl + '/api/Customers/get-customers-with-pagination', { headers: reqHeader, params:param }).pipe(map(data => data));
  }



  postCustomer() {
    return this.http.post(environment.ApiUrl + '/api/Customers/add-customer', this.formData);
  }

  putCustomer() {
    return this.http.put(environment.ApiUrl + '/api/Customers/update-customer/'+this.formData.customer_ID, this.formData);
  }

  deleteCustomer(iD : number) {
    return this.http.delete(environment.ApiUrl + '/api/Customers/delete-customer/'+iD);
  }



  getCustomerById(CustId : number): Observable<Customer> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Customers/get-customer-by-id/'+CustId, { headers: reqHeader }).pipe(map(data => <Customer>data));
  }
}
