import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

import { BranchUser } from 'src/app/shared/Models/branch-user';
import { BranchUserService } from 'src/app/shared/Services/branch-user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {


  term: string;

  itemsList: BranchUser[];
  currentIndex = -1;
  page: number = 0;
  count: number = 0;
  pageSize: number = 50;
  pageSizes = [5, 10, 20];
  title: string = '';

  UserID: string;
  UserType: string;

  constructor(private BranchUserSer: BranchUserService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getuser();
      }
    });
  }

  ngOnInit(): void {
  }

  getuser() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.BranchUserSer.getuserPages(params).subscribe(res => {
      // const { TotalRecords, Data } = res;
      this.itemsList = res.data;
      console.log(res)
      this.count = this.itemsList.length;
    },
      err => { console.log(err); });

  }

  openForEdit(Id: any) {
    this.router.navigate(['/user/edit/' + Id ]);
  }

  onOrderDelete(ItemIndex: number, Id: number) {
    if (confirm("هل انت متأكد من حذف هذا البيان")) {
      // this.BranchUserSer.deleteBranchUser(Id).subscribe(
      //   res => {
      //     this.showDeleted();
      //     this.itemsList.splice(ItemIndex, 1);
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // )
    }
  }


  showDeleted() {
    this.toastr.info('تم حذف البيان', 'المستخدم');
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
    this.getuser();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getuser();
  }

}
