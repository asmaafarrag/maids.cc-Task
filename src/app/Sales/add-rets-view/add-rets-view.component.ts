import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {MatPaginatorModule} from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddRet } from 'src/app/shared/Models/add-ret';
import { AddRetService } from 'src/app/shared/Services/add-ret.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-rets-view',
  templateUrl: './add-rets-view.component.html',
  styleUrls: ['./add-rets-view.component.css']
})
export class AddRetsViewComponent implements OnInit {

  term:string;

  AddRetsList: AddRet[];
  currentIndex = -1;
  page:number = 1;
  count :number = 0;
  pageSize :number = 5;
  pageSizes = [5, 10, 20];
  title : string = '';

  UserID: string;
  UserType: string;


  constructor(private AddRetServ: AddRetService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {    
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //let stageTypeId = this.currentRoute.snapshot.paramMap.get('id')
        
        //if (stageTypeId == null) {
          this.getAddRets();
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

  ngOnInit(): void {
    let pageNo = localStorage.getItem("addretspage")
    this.page=+pageNo
  
  }

  getAddRets() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
  
    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.AddRetServ.getAddRets(params).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.AddRetsList = Data;
        this.count = TotalRecords;
      },
        err => { console.log(err); });
    }
    else{    
      this.AddRetServ.getAddRetsByUser(this.UserID,params).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.AddRetsList = Data;
        this.count = TotalRecords;
        console.log(this.count , "count")
      },
        err => { console.log(err); });
    }
  }

  openForEdit(addRetID: number) {
    this.router.navigate(['/AddRets/edit/' + addRetID]);
  }

  onOrderDelete(ItemIndex: number, AddRetId: number) {
    if (confirm("هل انت متأكد من حذف هذا الاذن")) {
      this.AddRetServ.deleteAddRet(AddRetId).subscribe(
        res => {
          this.showDeleted();
          this.AddRetsList.splice(ItemIndex, 1);
        },
        err => {
          console.log(err);
        }
      )
    }
  }


  showDeleted() {
    this.toastr.info('تم حذف الاذن', 'اذون الاضافة');
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
  localStorage.setItem( "addretspage", event)
  this.getAddRets();
}

handlePageSizeChange(event) {
  this.pageSize = event.target.value;
  this.page = 1;
  this.getAddRets();
}


}

