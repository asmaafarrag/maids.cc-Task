import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { PriceLists } from 'src/app/shared/Models/price-lists';
import { PriceListsService } from 'src/app/shared/Services/price-lists.service';

@Component({
  selector: 'app-price-list-view',
  templateUrl: './price-list-view.component.html',
  styleUrls: ['./price-list-view.component.css']
})
export class PriceListViewComponent implements OnInit {


  term: string;
  isEnabled: boolean = true;
  itemsList: PriceLists[];
  currentIndex = -1;
  page: number = 0;
  count: number = 0;
  pageSize: number = 50;
  pageSizes = [20, 30, 40 , 50 , 60];
  title: string = '';
  UserID: string;
  UserType: string;
  url = 'http://pergola-api.minicodeco.com/api/PriceLists/print-pricelist/'

  ngOnInit(): void {
  }

  constructor(private dialog : MatDialog, private PriceListsTypeServ: PriceListsService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {

    this.UserID = localStorage.getItem('lUsr');
    this.UserType = localStorage.getItem('UserType');
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.gePriceLists();
      }
    });

  }


  gePriceLists() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.PriceListsTypeServ.getPriceListPages(params).subscribe(res => {
      console.log(res)
      this.itemsList = res.data;
      this.count = res.recordsTotal;
    },
      err => { console.log(err); });

  }

  openForEdit(Id: number) {


    this.router.navigate(['/PriceList/edit/' + Id]);
  }

  openContract(Id: number) {
    localStorage.setItem('priceIDD' , Id.toString());
    this.router.navigate(['/Contract']);

    // localStorage.removeItem('priceIDD' );
  }

  printPdf(id:number){
    window.open(this.url + id , '_blank');
  }



  onOrderDelete(ItemIndex: number, Id: number) {
    if (confirm("هل انت متأكد من حذف هذا البيان")) {
      this.PriceListsTypeServ.deletePriceLists(Id).subscribe(
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
    this.toastr.info('تم حذف البيان', 'عرض الاسعار');
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
    this.gePriceLists();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.gePriceLists();
  }



}
