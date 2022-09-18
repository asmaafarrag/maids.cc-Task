import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Customer } from 'src/app/shared/Models/customer.model';
import { CustomerService } from 'src/app/shared/Services/customer.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers-view',
  templateUrl: './customers-view.component.html',
  styleUrls: ['./customers-view.component.css']
})
export class CustomersViewComponent implements OnInit {

  term: string;

  custList: Customer[];
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 20];
  title: string = '';

  UserID: string;
  UserType: string;
  EmpID : string;

  constructor(private CustServ: CustomerService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {
    this.UserType = localStorage.getItem('UserType');
    this.UserID = localStorage.getItem('lUsr');
   this.EmpID =localStorage.getItem('EmpID');

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getCustomersList();

      }
    });
  }


  ngOnInit(): void {
    let pageNo = localStorage.getItem("customerspage")
    this.page=+pageNo
  
  }

  getCustomersList() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.CustServ.getCustomersList(params).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.custList = Data;
        this.count = TotalRecords;
      },
        err => { console.log(err); });
    }
    else {
      this.CustServ.getCustomersListByEmpId(params,this.EmpID).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.custList = Data;
        this.count = TotalRecords;
      },
        err => { console.log(err); });
    }

    
  }

  openForEdit(custId: number) {
    this.router.navigate(['/Customers/edit/' + custId]);
  }


  getRequestParams(searchTitle, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
     params['SearchString'] = searchTitle;
    }

    if (page) {
      params['PageNumber'] = page ;
    }

    if (pageSize) {
      params['PageSize'] = pageSize;
    }

    return params;
  }


  handlePageChange(event) {
    this.page = event;
    localStorage.setItem( "customerspage", event)
    this.getCustomersList();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getCustomersList();
  }

  onOrderDelete(ItemIndex: number, Id: number) {
    console.log("d", Id)
    if (confirm("هل انت متأكد من حذف هذا الاذن")) {
      this.CustServ.deleteCustomer(Id).subscribe(
        res => {
          this.showDeleted();
          this.custList.splice(ItemIndex, 1);
        },
        err => {
          console.log(err);
        }
      )
    }
  }


  showDeleted() {
    this.toastr.info('تم حذف العميل', 'العميل ');
  }

}
