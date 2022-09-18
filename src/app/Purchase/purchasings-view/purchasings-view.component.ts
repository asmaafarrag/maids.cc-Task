import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {MatPaginatorModule} from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Purchasing } from 'src/app/shared/Models/purchasing';
import { PurchasingService } from 'src/app/shared/Services/purchasing.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchasings-view',
  templateUrl: './purchasings-view.component.html',
  styleUrls: ['./purchasings-view.component.css']
})
export class PurchasingsViewComponent implements OnInit {

  term:string;

  PurchasingList: Purchasing[];
  currentIndex = -1;
  page:number = 1;
  count :number = 0;
  pageSize :number = 5;
  pageSizes = [5, 10, 20];
  title : string = '';

  UserID: string;
  UserType: string;

  constructor(private PurchasingServ: PurchasingService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {    
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //let stageTypeId = this.currentRoute.snapshot.paramMap.get('id')
        
        //if (stageTypeId == null) {
          this.getPurchasingInvs();
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
    let pageNo = localStorage.getItem("purchasingspage")
    this.page=+pageNo
  
  }



  getPurchasingInvs() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.PurchasingServ.getPurchasings(params).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.PurchasingList = Data;
        this.count = TotalRecords;
        console.log(this.count , "count")
      },
        err => { console.log(err); });
    }
    else{    
      this.PurchasingServ.getPurchasingsByUser(this.UserID,params).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.PurchasingList = Data;
        this.count = TotalRecords;
        console.log(this.count , "count")
      },
        err => { console.log(err); });
    }
  }

  openForEdit(PurchasingID: number) {
    this.router.navigate(['/Purchasings/edit/' + PurchasingID]);
  }

 
 getRequestParams(searchTitle, page, pageSize) {
  // tslint:disable-next-line:prefer-const
  let params = {};

  if (searchTitle) {
   params['SearchString'] = searchTitle;
  }

  if (page) {
    params['PageNumber'] = page  ;
  }

  if (pageSize) {
    params['PageSize'] = pageSize;
  }

  return params;
}


handlePageChange(event) {
  this.page = event;
  localStorage.setItem( "purchasingspage", event)
  this.getPurchasingInvs();
}

handlePageSizeChange(event) {
  this.pageSize = event.target.value;
  this.page = 1;
  this.getPurchasingInvs();
}

onOrderDelete(PurchasingIndex: number, PurchasingID: number) {
  if (confirm("هل انت متأكد من حذف هذه الفاتورة")) {
    this.PurchasingServ.deletePurchasing(PurchasingID).subscribe(
      res => {
        this.showDeleted();
        this.PurchasingList.splice(PurchasingIndex, 1);
      },
      err => {
        console.log(err);
      }
    )

    
  }
}

showDeleted() {
  this.toastr.info('تم حذف الفاتورة', 'فاتورة مشتريات');
}

}

