import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Enterprises } from 'src/app/shared/Models/enterprises';
import { Enterpriseservice } from 'src/app/shared/Services/enterprises.service';
@Component({
  selector: 'app-enterprises-view',
  templateUrl: './enterprises-view.component.html',
  styleUrls: ['./enterprises-view.component.css']
})
export class EnterprisesViewComponent implements OnInit {

  term: string;

  itemsList: Enterprises[];
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes = [5, 10, 20];
  title: string = '';

  UserID: string;
  UserType: string;
  EnterpriseId:string;

  constructor(private EnterprisesServ: Enterpriseservice, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {
    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    this.EnterpriseId= localStorage.getItem('EnterpriseId');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getEnterprisess();
      }
    });
  }

  ngOnInit(): void {
  }

  getEnterprisess() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.EnterprisesServ.getEnterprisesPages(params).subscribe(res => {
      const { TotalRecords, Data } = res;
      this.itemsList = Data;
      this.count = TotalRecords;
    },
      err => { console.log(err); });

  }

  openForEdit(Id: number) {
    this.router.navigate(['/Enterprises/edit/' + Id]);
  }

  onOrderDelete(ItemIndex: number, Id: number) {
    if (confirm("هل انت متأكد من حذف هذا البيان")) {
      this.EnterprisesServ.deleteEnterprises(Id).subscribe(
        res => {
          this.showDeleted();
          this.itemsList.splice(ItemIndex, 1);
        },
        err => {
          console.log(err);
        }
      )
    }
  }


  showDeleted() {
    this.toastr.info('تم حذف البيان', 'البيانات');
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
    this.getEnterprisess();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getEnterprisess();
  }


}

