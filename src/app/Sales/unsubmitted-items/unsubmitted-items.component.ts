import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconRegistry} from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// import { SalesSaleInv } from 'src/app/shared/Models/sales-sale-inv';
// import { ItemService } from 'src/app/shared/Services/sales-sale-inv.service';
// import { ETAService } from 'src/app/shared/Services/eta.service';

import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DocumentInvoice } from 'src/app/shared/Models/document-invoice';
import { EtaUser } from 'src/app/shared/Models/eta-user';
// import Swal from 'sweetalert2';
import { Item } from 'src/app/shared/Models/item';
import { ItemService } from 'src/app/shared/Services/item.service';
import { ServStockService } from 'src/app/shared/Services/serv-stock.service';

@Component({
  selector: 'app-unsubmitted-items',
  templateUrl: './unsubmitted-items.component.html',
  styleUrls: ['./unsubmitted-items.component.css']
})
export class UnsubmittedItemsComponent implements OnInit {

  // term: string;
  // flage : string = '';
  // SalesSaleInvList: Item[];
  // currentIndex = -1;
  // page: number = 1;
  // count: number = 0;
  // pageSize: number = 5;
  // pageSizes = [5, 10, 20];
  // title: string = '';
  // UserID: string;
  // UserType: string;
  // EmpID: string;

  // access_token: string;
  // errorMessage: string;
  // docInv: DocumentInvoice;

  // constructor(private SalesSaleInvServ: ItemService,  private servStockService: ServStockService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {
  //   this.UserID = localStorage.getItem('lUsr');
  //   this.UserType = localStorage.getItem('UserType');
  //   this.EmpID = localStorage.getItem('EmpID');

  //   router.events.subscribe((val) => {
  //     if (val instanceof NavigationEnd) {
  //       //let stageTypeId = this.currentRoute.snapshot.paramMap.get('id')

  //       //if (stageTypeId == null) {
  //       this.getSaleInvs();
  //       //}
  //       //else if  (stageTypeId == '0') {
  //       //this.GetEmpAlertsList();
  //       //}
  //       //else {
  //       //this.getStageClients(parseInt(stageTypeId));
  //       //}
  //     }
  //   });
  // }

  ngOnInit() {

  }
  // getSaleInvs() {

  //   this.servStockService.getItems().subscribe(res => this.SalesSaleInvList = res);
  //   console.log(this.SalesSaleInvList);
  // }

  // showSuccessAlert() {
  //   Swal.fire('Yikes!', 'Something went wrong!', 'success')
  // }

  // // Warning
  // showWarningAlert() {
  //   Swal.fire( 'الرجاء دفع قيمة الإشتراك' ,  'warning')
  // }

  // submitToETA() {



  //     var marvelHeroes = this.SalesSaleInvList.filter(function (hero) {
  //       return hero.isSelected == true;
  //     });

  //     //marvelHeroes.forEach((element) => {
  //     //  this.SalesSaleInvServ.GetEInvoiceFromSellings(element.SellingId).subscribe(
  //     //    res => {
  //     //      this.docInv = res;
  //     //      console.log(this.docInv);
  //     //      this.ETAServ.SubmitInvoice(res).subscribe(
  //     //        res => {
  //     //          this.showSubmited();
  //     //        }
  //     //      )
  //     //    })
  //     //});

  //     this.access_token = "amir";
  //     let EInvMode =  sessionStorage.getItem('selectedType')

  //     this.SalesSaleInvServ.GetUnSubmitedItems(marvelHeroes,EInvMode).subscribe(
  //       res => {
  //         this.showSubmited();
  //         this.showSuccess(res);

  //         /*
  //         this.SalesSaleInvList.forEach( (item, index) => {
  //           if(item.isSelected == true)
  //           {
  //             this.SalesSaleInvList.splice(index+i,1);
  //             i = i + 1;
  //           }
  //         });


  //         for( var i = this.SalesSaleInvList.length; i > 0 ; i--){

  //           if ( this.SalesSaleInvList[i].isSelected == true) {

  //             this.SalesSaleInvList.splice(i, 1);
  //           }

  //       }
  //       */
  //         this.SalesSaleInvList = this.SalesSaleInvList.filter(function (hero) {
  //           return hero.isSelected != true;
  //         });

  //         //this.SalesSaleInvList.splice(SellingIndex, 1);
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     )




  // }

  // showSuccess(msg) {
  //   this.toastr.error('',msg);
  // }


  // showSubmited() {
  //   this.toastr.info('تم ارسال الصنف', ' الأصناف');
  // }



  // getRequestParams(searchTitle, page, pageSize) {
  //   // tslint:disable-next-line:prefer-const
  //   let params = {};

  //   if (searchTitle) {
  //    params['title'] = searchTitle;
  //   }

  //   if (page) {
  //     params['PageNumber'] = page;
  //   }

  //   if (pageSize) {
  //     params['PageSize'] = pageSize;
  //   }

  //   return params;
  // }


  // handlePageChange(event) {
  //   this.page = event;
  //   this.getSaleInvs();
  // }

  // handlePageSizeChange(event) {
  //   this.pageSize = event.target.value;
  //   this.page = 1;
  //   this.getSaleInvs();
  // }

  // public isChecked$ = new BehaviorSubject(false);
  // toggleChecked() {
  //   this.isChecked$.next(!this.isChecked$.value)
  // }

  // public onSellingSelectedChanged(value: boolean, SellingIndex: number) {
  //   console.log(this.SalesSaleInvList[SellingIndex]);
  //   this.SalesSaleInvList[SellingIndex].isSelected = value;
  // }

  // exportToFile(fileName: string, element_id: string) {

  // }

  // // OnLogin(clientId: string, clientSecret: string) {
  // //   this.ETAServ.Login(clientId, clientSecret)
  // //     .subscribe((data: any) => {
  // //       console.log(data);
  // //       //this.access_token = data.access_token;
  // //       this.access_token = 'amir';
  // //       localStorage.setItem('etaToken', data.access_token);
  // //       this.errorMessage = null;
  // //     },
  // //       (err: HttpErrorResponse) => {
  // //         console.log('false');
  // //         //this.isLoginError = true;
  // //         this.errorMessage = 'Error';
  // //         console.log(this.errorMessage);
  // //       });
  // // }



}
