import { Contracts } from './../../shared/Models/contracts';
import { ContractsService } from './../../shared/Services/contracts.service';
import { Component, OnInit } from '@angular/core';
  import { ToastrService } from 'ngx-toastr';
  import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
  import { Router, NavigationEnd } from '@angular/router';
  import { ActivatedRoute } from '@angular/router';

  import { PriceLists } from 'src/app/shared/Models/price-lists';
  import { PriceListsService } from 'src/app/shared/Services/price-lists.service';
@Component({
  selector: 'app-contracts-view',
  templateUrl: './contracts-view.component.html',
  styleUrls: ['./contracts-view.component.css']
})
export class ContractsViewComponent implements OnInit {

    term: string;
    isEnabled: boolean = true;
    itemsList: Contracts[];
    currentIndex = -1;
    page: number = 0;
    count: number = 0;
    pageSize: number = 5;
    pageSizes = [5, 10, 20,50];
    title: string = '';
    clicked:boolean=false;

    UserID: string;
    UserType: string;

    url = 'http://pergola-api.minicodeco.com/api/Contracts/print-contract/'

    ngOnInit(): void {
    }

    constructor(private dialog : MatDialog, public contractServ: ContractsService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {

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
      this.contractServ.getContractsPages(params).subscribe(res => {
        console.log(res)
        this.itemsList = res.data;
        this.count =  this.itemsList.length;
      },
        err => { console.log(err); });

    }

    printPdf(id:number){
      // console.log(id,'idprice')
      // this.contractServ.printPricList(id).subscribe(res => {
      //   console.log(res ,"res")
      //   console.log('v')

      // },
      //   err => { console.log(err); });



      window.open(this.url + id , '_blank');
    }

    openForEdit(Id: number) {
      this.clicked = true;
      localStorage.removeItem('priceIDD');
      this.router.navigate(['/Contract/edit/' + Id]);
    }


    onOrderDelete(ItemIndex: number, Id: number) {
      if (confirm("هل انت متأكد من حذف هذا البيان")) {
        this.contractServ.deleteContracts(Id).subscribe(
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
      this.toastr.info('تم حذف البيان', ' العقد');
    }

    getRequestParams(searchTitle, page, pageSize) {
      // tslint:disable-next-line:prefer-const
      let params = {};

      if (searchTitle) {
       params['Key'] = searchTitle;
      }

      if (page) {
        params['PageNumber'] = page-1;
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
