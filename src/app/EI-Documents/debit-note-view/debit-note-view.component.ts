import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SellingRet } from 'src/app/shared/Models/selling-ret';
import { SellingRetService } from 'src/app/shared/Services/selling-ret.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Debit-note-view',
  templateUrl: './Debit-note-view.component.html',
  styleUrls: ['./Debit-note-view.component.css']
})
export class DebitNoteViewComponent implements OnInit {

  // term: string;

  // SellingRetsList: SellingRet[];
  // currentIndex = -1;
  // page: number = 1;
  // count: number = 0;
  // pageSize: number = 5;
  // pageSizes = [5, 10, 20];
  // title: string = '';
  // UserID: string;
  // UserType: string;
  // EmpID: string;

  // constructor(private SellingRetServ: SellingRetService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {
  //   this.UserID = localStorage.getItem('lUsr');
  //   this.UserType = localStorage.getItem('UserType');
  //   this.EmpID = localStorage.getItem('EmpID');

  //   router.events.subscribe((val) => {
  //     if (val instanceof NavigationEnd) {
  //       //let stageTypeId = this.currentRoute.snapshot.paramMap.get('id')

  //       //if (stageTypeId == null) {
  //       this.getSellingRets();
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



  // getSellingRets() {
  //   const params = this.getRequestParams(this.title, this.page, this.pageSize);

  //   if (this.UserType.toUpperCase() == 'ADMIN') {
  //     this.SellingRetServ.getSellingRets(params).subscribe(res => {
  //       const { TotalRecords, Data } = res;
  //       this.SellingRetsList = Data;
  //       this.count = TotalRecords;
  //       console.log(this.count,"count")
  //     },
  //       err => { console.log(err); });
  //   }
  //   else{
  //     this.SellingRetServ.getSellingRetsByUser(this.UserID,params).subscribe(res => {
  //       const { TotalRecords, Data } = res;
  //       this.SellingRetsList = Data;
  //       this.count = TotalRecords;
  //       console.log(this.count,"count")

  //     },
  //       err => { console.log(err); });
  //   }
  // }

  // openForEdit(saleInvId: number) {
  //   this.router.navigate(['/Debit/edit/' + saleInvId]);
  // }

  // onOrderDelete(SellingIndex: number, SellingId: number) {
  //   if (confirm("هل انت متأكد من حذف هذه الفاتورة")) {
  //     this.SellingRetServ.deleteSellingRet(SellingId).subscribe(
  //       res => {
  //         this.showDeleted();
  //         this.SellingRetsList.splice(SellingIndex, 1);
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     )
  //   }
  // }


  // showDeleted() {
  //   this.toastr.info('تم حذف المرتجع', 'مرتجع مبيعات');
  // }



  // getRequestParams(searchTitle, page, pageSize) {
  //   // tslint:disable-next-line:prefer-const
  //   let params = {};

  //   if (searchTitle) {
  //    params['title'] = searchTitle;
  //   }

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
  //   this.getSellingRets();
  // }

  // handlePageSizeChange(event) {
  //   this.pageSize = event.target.value;
  //   this.page = 1;
  //   this.getSellingRets();
  // }
}
