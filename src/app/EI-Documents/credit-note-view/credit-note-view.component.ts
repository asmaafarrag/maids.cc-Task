import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
//import { SalesSaleInv } from 'src/app/shared/Models/sales-sale-inv';
//import { CreditNoteService } from 'src/app/shared/Services/sales-sale-inv.service';
import { SellingCreditNotes } from 'src/app/shared/Models/SellingCreditNotes';
import { SellingCreditNoteService } from 'src/app/shared/Services/selling-credit-note.service';
import { ActivatedRoute } from '@angular/router';
import { ExcelService } from 'src/app/shared/Services/excel/excel.service';

@Component({
  selector: 'app-credit-note-view',
  templateUrl: './credit-note-view.component.html',
  styleUrls: ['./credit-note-view.component.css']
})
export class CreditNoteViewComponent implements OnInit {


  // term: string;

  // SalesSaleInvList: SellingCreditNotes[];
  // currentIndex = -1;
  // page: number = 1;
  // count: number = 0;
  // pageSize: number = 5;
  // pageSizes = [5, 10, 20];
  // title: string = '';
  // UserID: string;
  // UserType: string;
  // EmpID: string;

  // constructor(private CreditNoteServ: SellingCreditNoteService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute
  //   , private ExcelServ: ExcelService) {
  //   this.UserID = localStorage.getItem('lUsr');
  //   this.UserType = localStorage.getItem('UserType');
  //   this.EmpID = localStorage.getItem('EmpID');

  //   router.events.subscribe((val) => {
  //     if (val instanceof NavigationEnd) {
  //       //let stageTypeId = this.currentRoute.snapshot.paramMap.get('id')

  //       //if (stageTypeId == null) {
  //       this.getSellingCredit();
  //       //}
  //       //else if  (stageTypeId == '0') {
  //       //this.GetEmpAlertsList();
  //       //}
  //       //else {
  //       //this.getStageClients(parseInt(stageTypeId));
  //       //}
  //     }
  //   });
  // }

  ngOnInit() {

  }



  // getSellingCredit() {
  //   const params = this.getRequestParams(this.title, this.page, this.pageSize);

  //   this.CreditNoteServ.getSellingCreditNotes(params).subscribe(res => {
  //     const { TotalRecords, Data } = res;
  //     this.SalesSaleInvList = Data;
  //     this.count = TotalRecords;

  //   },
  //     err => { console.log(err); });

  //   // if (this.UserType.toUpperCase() == 'ADMIN') {
  //   //   this.CreditNoteServ.getSellingCreditNotes(params).subscribe(res => {
  //   //     const { TotalRecords, Data } = res;
  //   //     this.SalesSaleInvList = Data;
  //   //     this.count = TotalRecords;

  //   //   },
  //   //     err => { console.log(err); });
  //   // }
  //   // else {
  //   //   this.CreditNoteServ.getSellingCreditNotesByUser(this.UserID, params).subscribe(res => {
  //   //     const { TotalRecords, Data } = res;
  //   //     this.SalesSaleInvList = Data;
  //   //     this.count = TotalRecords;
  //   //   },
  //   //     err => { console.log(err); });
  //   // }
  // }

  // openForEdit(saleInvId: number) {
  //   this.router.navigate(['/Credit/edit/' + saleInvId]);
  // }

  // onOrderDelete(SellingIndex: number, SellingId: number) {
  //   if (confirm("هل انت متأكد من حذف هذه الفاتورة")) {
  //     this.CreditNoteServ.deleteSellingCreditNotes(SellingId).subscribe(
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
  //   this.toastr.info('تم حذف الإشعار', ' إشعار أضافة');
  // }



  // getRequestParams(searchTitle, page, pageSize) {
  //   // tslint:disable-next-line:prefer-const
  //   let params = {};

  //   //if (searchTitle) {
  //   //  params['title'] = searchTitle;
  //   //}

  //   if (page) {
  //     params['PageNumber'] = page;
  //   }

  //   if (pageSize) {
  //     params['PageSize'] = pageSize;
  //   }

  //   return params;
  // }


  // handlePageChange(event) {
  //   this.page = event;
  //   this.getSellingCredit();
  // }

  // handlePageSizeChange(event) {
  //   this.pageSize = event.target.value;
  //   this.page = 1;
  //   this.getSellingCredit();
  // }

  // fnExport() {
  //   this.ExcelServ.exportToFile('amir', 'Tbl');
  // }

  // fnImport() {
  //   this.ExcelServ.exportToFile('amir', 'Tbl');
  // }

  // onFileChange(evt: any) {
  //   const target: DataTransfer = <DataTransfer>(evt.target);
  //   if (target.files.length !== 1) throw new Error('Cannot use multiple files');

  //   var obj = { SellingCreditNoteDate: 'a', CustomerName: 'b', StoreName: 'c' , SellingCreditNoteTotalAmount: 'c', SellingCreditNoteTotalItemsDiscount: 'c', SellingCreditNoteNetAmount: 'c'};
  //    //const header: string[] = Object.getOwnPropertyNames(new SalesSaleInv());
  //     const header: string[] = Object.getOwnPropertyNames(obj);
  //     console.log(header);

  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {

  //     const bstr: string = e.target.result;
  //     const data = <any[]>this.ExcelServ.importFromFile(bstr);



  //     const importedData = data.slice(1, -1);

  //     this.SalesSaleInvList = importedData.map(arr => {
  //       const obj = {};
  //       for (let i = 0; i < header.length; i++) {
  //         const k = header[i];
  //         obj[k] = arr[i];
  //       }
  //       return <SellingCreditNotes>obj;
  //     })

  //   };
  //   reader.readAsBinaryString(target.files[0]);

  // }

}
