import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {MatPaginatorModule} from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Add } from 'src/app/shared/Models/add';
import { AddService } from 'src/app/shared/Services/add.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adds-view',
  templateUrl: './adds-view.component.html',
  styleUrls: ['./adds-view.component.css']
})
export class AddsViewComponent implements OnInit {

  term:string;

  AddsList: Add[];
  currentIndex = -1;
  page:number = 1;
  count :number = 0;
  pageSize :number = 5;
  pageSizes = [5, 10, 20];
  title : string = '';
  EmpID:string;
  UserID: string;
  UserType: string;

  constructor(private AddServ: AddService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {    
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    this.EmpID = localStorage.getItem('EmpID');

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        //let stageTypeId = this.currentRoute.snapshot.paramMap.get('id')
        
        //if (stageTypeId == null) {
          this.getAdds();
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
    let pageNo = localStorage.getItem("addspage")
    this.page=+pageNo
  
  }

  getAdds() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    
    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.AddServ.getAdds(params).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.AddsList = Data;
        this.count = TotalRecords;
      },
        err => { console.log(err); });
    }
    else{    
      this.AddServ.getAddsByUser(this.UserID,params).subscribe(res => {
        const { TotalRecords, Data } = res;
        this.AddsList = Data;
        this.count = TotalRecords;
      },
        err => { console.log(err); });
    }

  }

  openForEdit(addID: number) {
    this.router.navigate(['/Adds/edit/' + addID]);
  }

  onOrderDelete(ItemIndex: number, AddId: number) {
    if (confirm("هل انت متأكد من حذف هذا الاذن")) {
      this.AddServ.deleteAdd(AddId).subscribe(
        res => {
          this.showDeleted();
          this.AddsList.splice(ItemIndex, 1);
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
  localStorage.setItem( "addspage", event)
  this.getAdds();
}

handlePageSizeChange(event) {
  this.pageSize = event.target.value;
  this.page = 1;
  this.getAdds();
}


}
