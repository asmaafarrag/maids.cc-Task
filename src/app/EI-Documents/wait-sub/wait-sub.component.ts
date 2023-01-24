import { SubscribeService } from './../../shared/Services/subscribe.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubscribeRequest } from './../../shared/Models/subscribe-request';
@Component({
  selector: 'app-wait-sub',
  templateUrl: './wait-sub.component.html',
  styleUrls: ['./wait-sub.component.css']
})
export class WaitSubComponent implements OnInit {

  CurrentEmpId: number;
  EmpPermitslist:SubscribeRequest [];
  term: string;

  itemsList:SubscribeRequest [];
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 20];
  title: string = '';

  UserID: string;
  UserType: string;

  constructor(  public SubscribeServ:SubscribeService, private router: Router,private toastr: ToastrService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getEmpPermitsPages();
      }
    });

    this.UserID= localStorage.getItem('entrpriseId');

  }

  ngOnInit() {
    this.CurrentEmpId = parseInt(localStorage.getItem('EmpID'));
    //this.getEmpPermits();
  }


  getEmpPermitsPages() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.SubscribeServ.getSubscribeRequestsByUser(this.UserID).subscribe(res => {
      // const { TotalRecords, Data } = res;
      this.itemsList = res;
      // this.count = TotalRecords;
      console.log(res,"itemsList");
    },
      err => { console.log(err); });

  }

  openForEdit(saleInvId: number) {
    this.router.navigate(['/CreateSubscribe/edit/' + saleInvId]);
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
    this.getEmpPermitsPages();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getEmpPermitsPages();
  }



  AdOrEditSalBandItem(VacOrderIndex, VacOrderId) {


    this.SubscribeServ.putSubscribeRequestsPaid(VacOrderId).subscribe(
      res => {
        this.showSuccess();
      },
      err => { console.log(err); }
    )

    this.EmpPermitslist.splice(VacOrderIndex, 1);
  }

  RefuseRequest(VacOrderIndex, VacOrderId) {
    this.SubscribeServ.putSubscribeRequestsCancel(VacOrderId).subscribe(
      res => {
        this.showRefused();
      },
      err => { console.log(err); }
    )

    this.EmpPermitslist.splice(VacOrderIndex, 1);
  }


  showSuccess() {
    this.toastr.success('تم الاعتماد', 'طلب تصريح');
  }

  showRefused() {
    this.toastr.success('تم الرفض', 'طلب تصريح');
  }

}
