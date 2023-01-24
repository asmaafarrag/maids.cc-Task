import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DocumentSummaryDTO } from '../Models/document-summary-dto';
import { saveAs } from 'file-saver';
import { DocumentInvoice } from '../Models/document-invoice';
@Injectable({
  providedIn: 'root'
})
export class AllInvoiceService {

  formData : DocumentSummaryDTO;
  formData2:DocumentInvoice;
  constructor(private http: HttpClient) { }

  RecentDocuments(param , EInvMode:string): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    console.log("data")
    return this.http.get(environment.ApiUrl + '/api/EInvoice/RecentDocuments?EInvMode='+EInvMode, { headers: reqHeader, params: param }).pipe(map(data => data));
  }


  cancle(uuid:string ,reson:string , EInvMode:string) {
   
    // return this.http.put(environment.ApiUrl + '/api/Users/' + this.formData.UserId, this.formData);
    let reason = 'test'
    return this.http.put(environment.ApiUrl + '/api/v1.0/CancelDocuments/'+ uuid + '/state?reason=' + reson +'&EInvMode=' + EInvMode , uuid );
  }


  Reject(uuid:string ,reson:string , EInvMode:string) {
   
    // return this.http.put(environment.ApiUrl + '/api/Users/' + this.formData.UserId, this.formData);
    let reason = 'test'
    return this.http.put(environment.ApiUrl + '/api/v1.0/RejectDocuments/'+ uuid + '/state?reason=' + reson +'&EInvMode=' + EInvMode , uuid );
  }


  getPDF(uuId:number , EInvMode:string){
    // return this.http.get(environment.ApiUrl + '/api/EInvoice/Printout_Document/' + uuId, { responseType: 'arraybuffer' });

    const url = `${ environment.ApiUrl + '/api/EInvoice/Printout_Document/' + uuId +'?EInvMode='+EInvMode }`;
    
    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json',
       'Accept': 'application/pdf'
            
       //'responseType'  : 'blob' as 'json'        //This also worked
    };
    

    
    return this.http.get<any>(url, httpOptions);
    
  }

  showPdf(uuId:number , EInvMode:string) {
    const linkSource = 'data:application/pdf;base64,' + `${ environment.ApiUrl + '/api/EInvoice/Printout_Document/' + uuId +'?EInvMode='+EInvMode }`
    console.log(linkSource , "linkSource") 
    const downloadLink = document.createElement("a");
    const fileName = "sample.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }   


  // public getFile(uuId:number , EInvMode:string) {
  //   this.http.get('data:image/jpeg;base64' + environment.ApiUrl + '/api/EInvoice/Printout_Document/' + uuId +'?EInvMode='+EInvMode  , {responseType: 'blob'}).subscribe((data) => {
  //     const file = new Blob([data], { type: 'application/pdf' });

  //     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //       window.navigator.msSaveOrOpenBlob(file, "app.pdf");
  //     } else {
  //       let url = window.URL.createObjectURL(data);
  //       let a = document.createElement('a');
  //       document.body.appendChild(a);
  //       a.setAttribute('style', 'display: none');
  //       a.href = url;
  //       a.download = 'file.jpg';
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //       a.remove();
  //     }
  //   })
  // }


  RecentDocumentsSender(param, EInvMode:string): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    console.log("data")
    return this.http.get(environment.ApiUrl + '/api/EInvoice/RecentDocumentsSender?EInvMode='+EInvMode, { headers: reqHeader, params: param }).pipe(map(data => data));
  }

  
  RecentDocumentsReciever(param, EInvMode:string): any {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
    console.log("data")
    return this.http.get(environment.ApiUrl + '/api/EInvoice/RecentDocumentsReciver?EInvMode='+EInvMode, { headers: reqHeader, params: param }).pipe(map(data => data));
  }


  
  // Printout_Document(uuId: number): Observable<DocumentSummaryDTO> {
  //   const reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json', 'Authorization':
  //       'Bearer ' + localStorage.getItem('userToken')
  //   });
  //   return this.http.get(environment.ApiUrl + '/api/EInvoice/Printout_Document/' + uuId, { headers: reqHeader }).pipe(map(data => <DocumentSummaryDTO>data));
  // }



  PrintOutDocument(uuId: number) {
    return this.http.get(environment.ApiUrl + '/api/EInvoice/Printout_Document/' + uuId, { responseType: 'arraybuffer' });
    //  return window.open(environment.ApiUrl + '/api/EInvoice/Printout_Document/' + uuId) , {responseType: 'blob'}
  }

  // downloadFile(uuId: number): Observable<Blob> {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Accept', 'application/pdf');
	// 	return this.http.get(environment.ApiUrl + '/api/EInvoice/Printout_Document/'+ uuId, {headers: headers,responseType: 'blob'});
  // }

  downloadPdf(uuId: number) {
    // const file = new Blob([content], {type: 'text/plain'});
    // FileSaver.saveAs(file, "test.txt");
    return this.http.get(environment.ApiUrl + '/api/EInvoice/Printout_Document/'+ uuId, { responseType:'blob'  }).toPromise();
  }





  downloadFile(uuid:number , EInvMode:string){
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        'Bearer ' + localStorage.getItem('userToken')
    });
   let apiUrl = environment.ApiUrl + '/api/EInvoice/Printout_Document/' + uuid +'?EInvMode=' + EInvMode;
   return this.http.get
   (apiUrl, { responseType:'blob' as 'json' })
   .pipe(
     map((res:any) =>{
     let blobtool5 = new Blob([res],
     { type: 'application/pdf'});
    return saveAs(blobtool5 , 'dials.pdf')
     }),
   )
    .subscribe()
  }

  getPdfReport(uuid:number , EInvMode:string) {
    let apiUrl = environment.ApiUrl + '/api/EInvoice/Printout_Document/' + uuid +'?EInvMode=' + EInvMode;
    return this.http.get(apiUrl, { responseType: 'blob', observe: 'response'}).pipe(
      map((res: any) => {
        return new Blob([res.body], { type: 'application/pdf' });
      })
    );
  }

  fetchPDF(uuId: number): any {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    const path = this.http.get(environment.ApiUrl + '/api/EInvoice/Printout_Document/'+ uuId , {headers: headers,responseType: 'blob'})
    console.log(path , "path")
    return path;
  }

  // downloadPdf(id: number) {
    // let headers = new HttpHeaders();
    // headers = headers.set('Accept', 'application/pdf');
  //   return this.http.get(environment.ApiUrl + '/api/EInvoice/Printout_Document/'+ uuId, { headers: this.headers; responseType: 'arraybuffer' })
  //     .map((res: any) => res)
  //     .toPromise();
  // }

  // const blob = new Blob([new Uint8Array(byteArrays)], { type: "application/pdf" });
  //   const exportUrl = URL.createObjectURL(this.blob);
  //   window.open(exportUrl);
  //   URL.revokeObjectURL(exportUrl);



//    this.http.post("<SERVER_URL>", "<PARAMS_IF_ANY>", {
//     responseType:'arraybuffer'
// }).success(function(data, status, headers) {
//     var contentType = headers["content-type"] || "application/octet-stream";
//     var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
//     if (urlCreator) {
//         var blob = new Blob([data], { type: contentType });
//         var url = urlCreator.createObjectURL(blob);
//         var a = document.createElement("a");
//         document.body.appendChild(a);
//         a.style = "display: none";
//         a.href = url;
//         a.download = "download.pdf"; //you may assign this value from header as well 
//         a.click();
//         window.URL.revokeObjectURL(url);
//     }
// }
}
