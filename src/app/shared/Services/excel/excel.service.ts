import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Excel } from '../../Models/excel';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  // ItemList : Excel;


  constructor(private http: HttpClient) { }

  public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

    return data;
  }

  SendFile(ItemList) {
    console.log(ItemList,'in service');
    console.log(environment.ApiUrl + '/api/Item/PostItemExcelsheet', ItemList);
    console.log(this.http.post(environment.ApiUrl + '/api/Item/PostItemExcelsheet', ItemList));

    return this.http.post(environment.ApiUrl + '/api/Item/PostItemExcelsheet', ItemList);
  }

  SendFileCust(ItemList) {
    console.log(ItemList,'in service');
    console.log(environment.ApiUrl + '/api/Item/PostCustomerExcelSheet', ItemList);
    console.log(this.http.post(environment.ApiUrl + '/api/Item/PostCustomerExcelSheet', ItemList));

    return this.http.post(environment.ApiUrl + '/api/Item/PostCustomerExcelSheet', ItemList);
  }


  public exportToFile(fileName: string, element_id: string) {
    if (!element_id) throw new Error('Element Id does not exists');

    let tbl = document.getElementById(element_id);
    let wb = XLSX.utils.table_to_book(tbl);
    XLSX.writeFile(wb, fileName + '.xlsx');
  }
}
