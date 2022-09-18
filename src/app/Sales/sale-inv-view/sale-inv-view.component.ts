import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SalesSaleInv } from 'src/app/shared/Models/sales-sale-inv';
import { SalesSaleInvService } from 'src/app/shared/Services/sales-sale-inv.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale-inv-view',
  templateUrl: './sale-inv-view.component.html',
  styleUrls: ['./sale-inv-view.component.css']
})
export class SaleInvViewComponent implements OnInit {

  term: string;

  SalesSaleInvList: SalesSaleInv[];
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 20];
  title: string = '';
  UserID: string;
  UserType: string;
  EmpID: string;

  constructor(private SalesSaleInvServ: SalesSaleInvService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    this.EmpID = localStorage.getItem('EmpID');

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //let stageTypeId = this.currentRoute.snapshot.paramMap.get('id')

        //if (stageTypeId == null) {
        this.getSaleInvs();
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
    let pageNo = localStorage.getItem("saleinvpage")
    this.page=+pageNo
  
  }



  getSaleInvs() {
    const params = this.getRequestParams(this.term, this.page, this.pageSize);
    // console.log(this.term);
    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.SalesSaleInvServ.getSaleInvs(params).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.SalesSaleInvList = Data;
        this.count = TotalRecords;
        console.log(this.count , "count")
      },
        err => { console.log(err); });
    }
    else{    
      this.SalesSaleInvServ.getSaleInvsByEmp(this.EmpID,params).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.SalesSaleInvList = Data;
        this.count = TotalRecords;
        console.log(this.count , "count")
      },
        err => { console.log(err); });
    }
  }

  openForEdit(saleInvId: number) {
    this.router.navigate(['/SaleInvs/edit/' + saleInvId]);
  }

  onOrderDelete(SellingIndex: number, SellingId: number) {
    if (confirm("هل انت متأكد من حذف هذه الفاتورة")) {
      this.SalesSaleInvServ.deleteSaleInv(SellingId).subscribe(
        res => {
          this.showDeleted();
          this.SalesSaleInvList.splice(SellingIndex, 1);
        },
        err => {
          console.log(err);
        }
      )

      
    }
  }


  showDeleted() {
    this.toastr.info('تم حذف الفاتورة', 'فاتورة مبيعات');
  }



  getRequestParams(searchTitle, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      params['SearchString'] = searchTitle;
    }

    if (page) {
      params['PageNumber'] = page;
    }

    if (pageSize) {
      params['PageSize'] = pageSize;
    }

    return params;
  }


  handlePageChange(event) {
    this.page = event;
    localStorage.setItem( "saleinvpage", event)
    this.getSaleInvs();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getSaleInvs();
  }

}
