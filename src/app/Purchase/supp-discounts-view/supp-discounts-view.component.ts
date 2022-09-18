import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';



import { ActivatedRoute } from '@angular/router';
import { SuppDiscountService } from 'src/app/shared/Services/Supp-discount.service';
import { SuppDiscount } from 'src/app/shared/Models/supp-discount';

@Component({
  selector: 'app-supp-discounts-view',
  templateUrl: './supp-discounts-view.component.html',
  styleUrls: ['./supp-discounts-view.component.css']
})
export class SuppDiscountsViewComponent implements OnInit {

  term: string;

  SuppDiscountList: SuppDiscount[];
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 20];
  title: string = '';

  UserID: string;
  UserType: string;

  constructor(private SuppDiscServ: SuppDiscountService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getSuppDiscs();

      }
    });
  }

  ngOnInit(): void {

    let pageNo = localStorage.getItem("suppdiscountspage")
    this.page=+pageNo

  }

  getSuppDiscs() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
         
        this.SuppDiscServ.getSuppDiscountsList(params).subscribe(res => {
          const { TotalRecords, Data } = res;
          this.SuppDiscountList = Data;
          this.count = TotalRecords;
        },
          err => { console.log(err); });
      
  }

  openForEdit(SuppDiscId: number) {
    this.router.navigate(['/SuppDisc/edit/' + SuppDiscId]);
  }

  onOrderDelete(SuppDiscIndex: number, SuppDiscId: number) {
    if (confirm("هل انت متأكد من حذف هذا الاشعار")) {
      this.SuppDiscServ.deleteSuppDiscount(SuppDiscId).subscribe(
        res => {
          this.showDeleted();
          this.SuppDiscountList.splice(SuppDiscIndex, 1);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  showDeleted() {
    this.toastr.info('تم حذف الاشعار', 'اشعارات خصم موردين');
  }

  getRequestParams(searchTitle, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
     params['title'] = searchTitle;
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
    localStorage.setItem( "suppdiscountspage", event)
    this.getSuppDiscs();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getSuppDiscs();
  }

  
}
