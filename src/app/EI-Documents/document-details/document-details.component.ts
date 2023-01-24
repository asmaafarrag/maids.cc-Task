import { Component, OnInit , Inject, ViewChild } from '@angular/core';
  import { Router, NavigationEnd } from '@angular/router';
  import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
  import { ToastrService } from 'ngx-toastr';
  
  import { CRMProjects } from 'src/app/shared/Models/crm-projects';
  import { CRMStages } from 'src/app/shared/Models/crm-stages';
  import { CRMChannels } from 'src/app/shared/Models/crm-channels';
  import { Emps } from 'src/app/shared/Models/emps';
  
  import { ActivatedRoute } from '@angular/router';
  import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
  import { SalesSaleInv } from 'src/app/shared/Models/sales-sale-inv';
  import { SalesSaleInvService } from 'src/app/shared/Services/sales-sale-inv.service';
  import { ExcelService } from 'src/app/shared/Services/excel/excel.service';
  import { DocumentSummaryDTO } from 'src/app/shared/Models/document-summary-dto';
  import { AllInvoiceService } from 'src/app/shared/Services/all-invoice.service';
  import { saveAs } from 'file-saver'
import { DocumentInvoice } from 'src/app/shared/Models/document-invoice';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {

  term: string;
  SalesSaleInvList: DocumentInvoice[];
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 20];
  title: string = '';
  UserID: string;
  UserType: string;
  EmpID: string;
  tab2:boolean = false;
  tab3:boolean = false;
  panelOpenState = false;
  FileSaver=require('file-saver');

  constructor(public salInvServ:SalesSaleInvService,private AllInvServ:AllInvoiceService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute
    , private ExcelServ: ExcelService) {
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    this.EmpID = localStorage.getItem('EmpID');

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //let stageTypeId = this.currentRoute.snapshot.paramMap.get('id')

        //if (stageTypeId == null) {
        this.getAllInv();
        //}
        //else if  (stageTypeId == '0') {
        //this.GetEmpAlertsList();
        //}
        //else {
        //this.getStageClients(parseInt(stageTypeId));
        //}
      }
    });
  }

  ngOnInit() {
    let saleInvId = this.currentRoute.snapshot.paramMap.get('id')
  
    // this.resetForm();
  
    // if (saleInvId != null)
    //   this.populateForm(parseInt(saleInvId));

  }


  tab2Clicked(){
    this.tab2 = true
    console.log(this.tab2, "2")
  }

  tab3Clicked(){
    this.tab3 = !this.tab3
  }


  // populateForm(clientId: number) {
  //   this.service.getClientById(clientId).subscribe(res =>  
  //     {
  //       this.service.formData = res;
  //     } );
  // }


  getAllInv() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    // console.log(params,"param")

    let EInvMode =  sessionStorage.getItem('selectedType')

      this.AllInvServ.RecentDocuments(params ,EInvMode ).subscribe(res => {
        // console.log("param2")
        // const { TotalRecords, Data } = res;
        // this.SalesSaleInvList = Data;
        // this.count = TotalRecords;
        // console.log(TotalRecords, Data)
        this.SalesSaleInvList = res.result ;
        // console.log(res , "res")
        // console.log(this.SalesSaleInvList , "SalesSaleInvList")
      },
        err => { console.log(err); });
  
  }

  // resetForm(form?: NgForm) {
  //   if (form != null)
  //     form.form.reset();
  //   this.AllInvServ.formData2 = {
  //     issuer: Company;
  //   receiver: Company;

  //   documentType: '', // "I",
  //   documentTypeVersion: '', // "0.9",
  //   dateTimeIssued: null, // "2020-10-27T23:59:59Z",
  //   taxpayerActivityCode: '',  //"4620",
  //   internalID: '',// "IID1",
  //   purchaseOrderReference: '', //"P-233-A6375",
  //   purchaseOrderDescription: '', // "purchase Order description",
  //   salesOrderReference: '', // "1231",
  //   salesOrderDescription: '', // "Sales Order description",
  //   proformaInvoiceNumber: '', // "SomeValue",

  //   payment: Payment;
  //   delivery: Delivery;

  //   invoiceLines: InvoiceLine[];

  //   totalDiscountAmount: null,; // 76.29,
  //   totalSalesAmount: null,; // 1609.90,
  //   netAmount: null,; // 1533.61,

  //   taxTotals: TaxTypeAmount;
  //   totalAmount: null, // 5191.50,
  //   extraDiscountAmount: null, // 5.00,
  //   totalItemsDiscountAmount: null,
  //   }




  // }


  Print(uuId:number){
    // console.log(uuId ,"uuid")
    // // this.AllInvServ.downloadFile(uuId)
    // // .subscribe(blob=> {
    // //    saveAs(blob, 'test.pdf');
    // // });

    // saveAs(this.AllInvServ.fetchPDF(uuId), '_blank');
    // console.log("done");

    let EInvMode =  sessionStorage.getItem('selectedType')

    this.AllInvServ.getPDF(uuId, EInvMode).subscribe((response)=>{
    console.log(response);
    let base64String = response;

    saveAs(response ,' test.pdf')

    // let base64String = `${ environment.ApiUrl + '/api/EInvoice/Printout_Document/' + uuId +'?EInvMode='+EInvMode }`

    this.getCsvReport(base64String);
    //this.downloadPdf(base64String,"sample.pdf");

      //let file = new Blob([response], { type: 'application/pdf' });    
      // var URL=  saveAs(file, 'test.pdf');
    //  this.downloadPdf(response,'amir') 
    ///    var fileURL = URL.createObjectURL(file);
      //  window.open(fileURL);

        console.log("done");
    })

    
  }

  getCsvReport(blobData) {

    let arr = new Uint8Array(blobData);
        let downloadLink = document.createElement('a');
        let b = new Blob([arr], { type: 'application/octet-stream' })
        downloadLink.href = window.URL.createObjectURL(b);
        downloadLink.setAttribute('download', "prescription.pdf");
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.parentNode.removeChild(downloadLink);

    const header = { Accept: "application/octet-stream" };
    console.log(blobData,'blobData');
    
      const a = document.createElement('a');
      document.body.appendChild(a);
      const blob: any = new Blob(blobData, { type: 'octet/stream' });
      console.log(blob,'blob');
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = "amir";
      a.click();
      window.URL.revokeObjectURL(url);
      
  }
  
  downloadPdf(base64String, fileName){
    if(window.navigator ){ 
      // download PDF in IE
      let byteChar = atob(base64String);
      let byteArray = new Array(byteChar.length);
      for(let i = 0; i < byteChar.length; i++){
        byteArray[i] = byteChar.charCodeAt(i);
      }
      let uIntArray = new Uint8Array(byteArray);
      let blob = new Blob([uIntArray], {type : 'application/pdf'});
      saveAs(blob, '_blank');
      // window.navigator.msSaveOrOpenBlob(blob, `${fileName}.pdf`);
    } else {
      // Download PDF in Chrome etc.
      const source = `data:application/pdf;base64,${base64String}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    
  }
  // downloadPdf(base64String, fileName){
    
    
  //     // // download PDF in IE
  //     // let byteChar = atob(base64String);
  //     // let byteArray = new Array(byteChar.length);
  //     // for(let i = 0; i < byteChar.length; i++){
  //     //   byteArray[i] = byteChar.charCodeAt(i);
  //     // }
  //     // let uIntArray = new Uint8Array(byteArray);
  //     // let blob = new Blob([uIntArray], {type : 'application/pdf'});
  //     // //window.navigator.msSaveOrOpenBlob(blob, `${fileName}.pdf`);
  //     // var URL=  saveAs(blob, 'test.pdf');
  //     // window.open(URL);
  
  //     // Download PDF in Chrome etc.
      
  //     // const source = `data:application/pdf;base64,${base64String}`;
  //     // const link = document.createElement("a");
  //     // link.href = source;
  //     // link.download = `${fileName}.pdf`
  //     // link.click();
    
  //     const url = window.URL.createObjectURL(new Blob([`data:application/pdf;base64,${base64String}`]));
  //     console.log(url);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', fileName ); //or any other extension
  //     document.body.appendChild(link);
  //     link.click();

  //     const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  //     const pdfName = 'your_pdf_file';
  //     this.FileSaver.saveAs(pdfUrl, pdfName);

      
      
    
  // }


  // private convertBase64ToBlob(Base64Image: any) {
  //   // SPLIT INTO TWO PARTS
  //   const parts = Base64Image.split(';base64,');
  //   // HOLD THE CONTENT TYPE
  //   const imageType = parts[0].split(':')[1];
  //   // DECODE BASE64 STRING
  //   const decodedData = window.atob(parts[1]);
  //   // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
  //   const uInt8Array = new Uint8Array(decodedData.length);
  //   // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
  //   for (let i = 0; i < decodedData.length; ++i) {
  //     uInt8Array[i] = decodedData.charCodeAt(i);
  //   }
  //   // RETURN BLOB IMAGE AFTER CONVERSION
  //   return new Blob([uInt8Array], { type: imageType });
  // }

  // openForEdit(saleInvId: number) {
  //   this.router.navigate(['/allInv/edit/' + saleInvId]);
  // }

  // onOrderDelete(SellingIndex: number, SellingId: number) {
  //   if (confirm("هل انت متأكد من حذف هذه الفاتورة")) {
  //     this.AllInvServ.deleteSaleInv(SellingId).subscribe(
  //       res => {
  //         this.showDeleted();
  //         this.SalesSaleInvList.splice(SellingIndex, 1);
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     )


  //   }
  // }

  

  // showDeleted() {
  //   this.toastr.info('تم حذف الفاتورة', 'فاتورة مبيعات');
  // }



  getRequestParams(searchTitle, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    // if (searchTitle) {
    //  params['SearchString'] = searchTitle;
    // }

    if (page) {
      params['pageNo'] = page;
    }

    if (pageSize) {
      params['pageSize'] = pageSize;
    }

    return params;
  }


  handlePageChange(event) {
    this.page = event;
    this.getAllInv();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllInv();
  }

  fnExport() {
    this.ExcelServ.exportToFile('amir', 'Tbl');
  }

  fnImport() {
    this.ExcelServ.exportToFile('amir', 'Tbl');
  }
  
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    var obj = { SellingDate: 'a', CustomerName: 'b', StoreName: 'c' , SellingTot: 'c', SellingDisc: 'c', SellingVal: 'c'};
      //const header: string[] = Object.getOwnPropertyNames(new SalesSaleInv());      
      const header: string[] = Object.getOwnPropertyNames(obj);      
      console.log(header);

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = <any[]>this.ExcelServ.importFromFile(bstr);

      

      const importedData = data.slice(1, -1);
      
      this.SalesSaleInvList = importedData.map(arr => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return <DocumentInvoice>obj;
      })

    };
    reader.readAsBinaryString(target.files[0]);

  }

  
  
}
  