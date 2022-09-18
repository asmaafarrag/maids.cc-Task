import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CustDiscount } from 'src/app/shared/Models/cust-discount';
import { CustDiscountService } from 'src/app/shared/Services/cust-discount.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cust-discounts-view',
  templateUrl: './cust-discounts-view.component.html',
  styleUrls: ['./cust-discounts-view.component.css']
})
export class CustDiscountsViewComponent implements OnInit {

  term: string;

  CustDiscountList: CustDiscount[];
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 20];
  title: string = '';

  UserID: string;
  UserType: string;

  constructor(private CustDiscServ: CustDiscountService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getCustDiscs();

      }
    });
  }

  ngOnInit(): void {
    let pageNo = localStorage.getItem("custdiscountspage")
    this.page=+pageNo
  
  }

  getCustDiscs() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
         
        this.CustDiscServ.getCustDiscountsList(params).subscribe(res => {
          const { TotalRecords, Data } = res;
          this.CustDiscountList = Data;
          this.count = TotalRecords;
          console.log(this.count , TotalRecords , Data , "count")
        },
          err => { console.log(err); });    
  }

  openForEdit(CustDiscId: number) {
    this.router.navigate(['/CustDisc/edit/' + CustDiscId]);
  }

  onOrderDelete(CustDiscIndex: number, CustDiscId: number) {
    if (confirm("هل انت متأكد من حذف هذا الاشعار")) {
      this.CustDiscServ.deleteCustDiscount(CustDiscId).subscribe(
        res => {
          this.showDeleted();
          this.CustDiscountList.splice(CustDiscIndex, 1);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  showDeleted() {
    this.toastr.info('تم حذف الاشعار', 'اشعارات خصم عملاء');
  }

  getRequestParams(searchTitle, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
     params['SearchString'] = searchTitle;
    }

    if (page) {
      params['PageNumber'] = page - 1;
    }

    if (pageSize) {
      params['PageSize'] = pageSize;
    }

    return params;
  }


  handlePageChange(event) {
    this.page = event;
    localStorage.setItem( "custdiscountspage", event)
    this.getCustDiscs();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getCustDiscs();
  }

}


