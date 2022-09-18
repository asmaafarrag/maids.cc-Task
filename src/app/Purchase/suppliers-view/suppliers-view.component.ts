import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Supplier } from 'src/app/shared/Models/supplier';
import { SupplierService } from 'src/app/shared/Services/supplier.service';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-suppliers-view',
  templateUrl: './suppliers-view.component.html',
  styleUrls: ['./suppliers-view.component.css']
})
export class SuppliersViewComponent implements OnInit {

  term: string;

  suppList: Supplier[];
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 20];
  title: string = '';
  UserID: string;
  UserType: string;
  EmpID: string;
  constructor(private SuppServ: SupplierService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    this.EmpID = localStorage.getItem('EmpID');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getSuppliersList();

      }
    });
  }


  ngOnInit(): void {

    let pageNo = localStorage.getItem("supplierspage")
    this.page=+pageNo

  }

  getSuppliersList() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.SuppServ.getSuppliersList(params).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.suppList = Data;
        this.count = TotalRecords;
        console.log(Data, "count all")
      },
        err => { console.log(err); });
    }
    else{    
      this.SuppServ.getSuppliersListyByEmpId(params,this.EmpID).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.suppList = Data;
        this.count = TotalRecords;
        console.log(Data , "count")
      },
        err => { console.log(err); });
    }
    // this.SuppServ.getSuppliersList(params).subscribe(res => {
    //   const { TotalRecords, Data } = res;
    //   this.suppList = Data;
    //   this.count = TotalRecords;
    // },
    //   err => { console.log(err); });
  }

  openForEdit(suppId: number) {
    this.router.navigate(['/Suppliers/edit/' + suppId]);
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
    localStorage.setItem( "supplierspage", event)
    this.getSuppliersList();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getSuppliersList();
  }

}
