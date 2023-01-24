import { Contracts } from './../Models/contracts';
import { from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  formData : Contracts;
  constructor(private http: HttpClient) { }

  getContracts(): Observable<Contracts[]> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Contracts/get-contracts-drop-down-list', { headers: reqHeader }).pipe(map(data => <Contracts[]>data));
  }

  getContractsPages(param): any {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    // return this.http.get(environment.ApiUrl + '/api/Customers/get-customers-with-pagination', { headers: reqHeader, params: param , observe: 'response' });
    return this.http.get(environment.ApiUrl + '/api/Contracts/get-contracts-with-pagination', { headers: reqHeader, params:param }).pipe(map(data => data));
  }



  postContracts() {
    return this.http.post(environment.ApiUrl + '/api/Contracts/add-contract', this.formData);
  }

  putContracts() {
    console.log(this.formData,"this.formData")
    return this.http.put(environment.ApiUrl + '/api/Contracts/update-contract/'+this.formData.contract_ID, this.formData);
  }

  deleteContracts(iD : number) {
    return this.http.delete(environment.ApiUrl + '/api/Contracts/delete-contract/'+iD);
  }



  getContractsById(Id : number): Observable<Contracts> {
    //const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    return this.http.get(environment.ApiUrl + '/api/Contracts/get-contract-by-id/' + Id, { headers: reqHeader }).pipe(map(data => <Contracts>data));

  }


  printPricList(id:number){
    console.log(id , "idService")
    return this.http.get(environment.ApiUrl + '/api/PriceLists/print-pricelist/' + id);
  }

}
