import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TransBetStores } from 'src/app/shared/Models/trans-bet-stores';
import { TransBetStoresService } from 'src/app/shared/Services/trans-bet-stores.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trans-bet-stores-view',
  templateUrl: './trans-bet-stores-view.component.html',
  styleUrls: ['./trans-bet-stores-view.component.css']
})
export class TransBetStoresViewComponent implements OnInit {

  term: string;

  TransBetStoresList: TransBetStores[];
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 20];
  title: string = '';
  UserID: string;
  UserType: string;

  constructor(private TransBetStoresServ: TransBetStoresService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //let stageTypeId = this.currentRoute.snapshot.paramMap.get('id')

        //if (stageTypeId == null) {
        this.getTransBetStores();
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
    // let pageNo = localStorage.getItem("transbetstorespage")
    // this.page=+pageNo
  
  }



  getTransBetStores() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
      if (this.UserType.toUpperCase() == 'ADMIN') {
        this.TransBetStoresServ.getTransBetStores(params).subscribe(res => {
          const { TotalRecords, Data } = res;
          this.TransBetStoresList = Data;
          this.count = TotalRecords;
        },
          err => { console.log(err); });
      }
      else{    
        this.TransBetStoresServ.getTransBetStoresByUser(this.UserID,params).subscribe(res => {
          const { TotalRecords, Data } = res;
          this.TransBetStoresList = Data;
          this.count = TotalRecords;
        },
          err => { console.log(err); });
      }
  }

  openForEdit(tbsId: number) {
    this.router.navigate(['/TransBetStores/edit/' + tbsId]);
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
    // localStorage.setItem( "transbetstorespage", event)
    this.getTransBetStores();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getTransBetStores();
  }


  onOrderDelete(PurchasingIndex: number, PurchasingID: number) {
    if (confirm("هل انت متأكد من حذف هذه الفاتورة")) {
      this.TransBetStoresServ.deleteTransBetStores(PurchasingID).subscribe(
        res => {
          this.showDeleted();
          this.TransBetStoresList.splice(PurchasingIndex, 1);
        },
        err => {
          console.log(err);
        }
      )
  
      
    }
  }
  
  showDeleted() {
    this.toastr.info('تم حذف تحويل المخازن', 'تحويل المخازن ');
  }

}
