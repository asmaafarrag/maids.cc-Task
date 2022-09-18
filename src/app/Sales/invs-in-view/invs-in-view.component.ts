import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SalesInv } from 'src/app/shared/Models/sales-inv';
import { InvsService } from 'src/app/shared/Services/invs.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invs-in-view',
  templateUrl: './invs-in-view.component.html',
  styleUrls: ['./invs-in-view.component.css']
})
export class InvsInViewComponent implements OnInit {

  term: string;

  SalesInvList: SalesInv[];
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 20];
  title: string = '';

  UserID: string;
  UserType: string;

  constructor(private InvServ: InvsService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getInvsIn();

      }
    });
  }



  ngOnInit(): void {
    let pageNo = localStorage.getItem("invsinpage")
    this.page=+pageNo
  
  }

  getInvsIn() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
          if (this.UserType.toUpperCase() == 'ADMIN') {
        this.InvServ.getInvsIn(params).subscribe(res => {
          const { TotalRecords, Data } = res;
          this.SalesInvList = Data;
          this.count = TotalRecords;
        },
          err => { console.log(err); });
      }
      else{    
        this.InvServ.getInvsInByUser(this.UserID,params).subscribe(res => {
          const { TotalRecords, Data } = res;
          this.SalesInvList = Data;
          this.count = TotalRecords;
        },
          err => { console.log(err); });
      }
  }

  openForEdit(saleInvId: number) {
    this.router.navigate(['/InvIn/edit/' + saleInvId]);
  }

  onOrderDelete(InvIndex: number, InvId: number) {
    if (confirm("هل انت متأكد من حذف هذا السند")) {
      console.log(InvId);
      this.InvServ.deleteSaleInv(InvId).subscribe(
        res => {
          this.showDeleted();
          this.SalesInvList.splice(InvIndex, 1);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  showDeleted() {
    this.toastr.info('تم حذف السند', 'سندات القبض');
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
    localStorage.setItem( "invsinpage", event)
    this.getInvsIn();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getInvsIn();
  }

}

