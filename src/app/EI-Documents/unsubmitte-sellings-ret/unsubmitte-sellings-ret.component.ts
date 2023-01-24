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
import { SalesSaleInv } from 'src/app/shared/Models/sales-sale-inv';
import { SalesSaleInvService } from 'src/app/shared/Services/sales-sale-inv.service';
import { ETAService } from 'src/app/shared/Services/eta.service';

import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DocumentInvoice } from 'src/app/shared/Models/document-invoice';
import { EtaUser } from 'src/app/shared/Models/eta-user';
import { SellingRet } from 'src/app/shared/Models/selling-ret';
import { SellingRetService } from 'src/app/shared/Services/selling-ret.service';


import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { PopuploginComponent } from '../popuplogin/popuplogin.component';
import { BranchService } from 'src/app/shared/Services/branch.service';
import { ActivityTypeService } from 'src/app/shared/Services/activity-type.service';
import { ActivityType } from 'src/app/shared/Models/activity-type';
import { Branch } from 'src/app/shared/Models/branch';
import { DatePipe } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
@Component({
  selector: 'app-unsubmitte-sellings-ret',
  templateUrl: './unsubmitte-sellings-ret.component.html',
  styleUrls: ['./unsubmitte-sellings-ret.component.css']
})
export class UnsubmitteSellingsRetComponent implements OnInit {

  // term: string;

  // // flage : string = '';
  // SalesSaleInvList: SellingRet[];
  // branchlist: Branch[];
  // selectedBranch: Branch;
  // isValid: boolean = true;

  // ActivityTypelist:ActivityType[];
  // SelectedActivityTypeID: string ='';

  // currentIndex = -1;
  // page: number = 1;
  // count: number = 0;
  // pageSize: number = 5;
  // pageSizes = [5, 10, 20];
  // title: string = '';
  // UserID: string;
  // UserType: string;
  // EmpID: string;
  // flage = false
  // access_token: string;
  // errorMessage: string;

  // docInv: DocumentInvoice;
  // color: ThemePalette = 'accent';
  // checked = true;
  // disabled = true;
  // constructor(   private dialog: MatDialog,public BranchServ: BranchService ,public datepipe: DatePipe,public activityServ:ActivityTypeService, public SalesSaleInvServ: SellingRetService, private ETAServ: ETAService, private router: Router, private toastr: ToastrService, private currentRoute: ActivatedRoute) {
  //   this.UserID = localStorage.getItem('lUsr');
  //   this.UserType = localStorage.getItem('UserType');
  //   this.EmpID = localStorage.getItem('EmpID');

  //   router.events.subscribe((val) => {
  //     if (val instanceof NavigationEnd) {
  //       //let stageTypeId = this.currentRoute.snapshot.paramMap.get('id')

  //       //if (stageTypeId == null) {
  //       // this.getSaleInvs();
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

    // this.resetForm();
    // this.BranchServ.getBranchs().subscribe(res => this.branchlist = res);
    // this.activityServ.getActivitySpecificTypes().subscribe(res => this.ActivityTypelist = res);

  }


  // resetForm(form?: NgForm) {
  //   if (form != null)
  //     form.form.reset();
  //   this.SalesSaleInvServ.formData = {
  //     SellingRetId: -1,
  //     SellingRetName: '',
  //   SellingRetVal: 0,
  //   SellingRetDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
  //   SellingRetNotes: '',
  //   SellingRetType: null,
  //   CustomerID: 0,
  //   isSelected:false,
  //   CustomerName: '',
  //   SellingRetDisc: 0,
  //   SellingRetTot: 0,
  //   TreasuryId:null,
  //   StoreId: 0,
  //   StoreName: '',
  //   SellingRetDiscRatio: 0,
  //   TaxGainComRatio :null,
  //   TaxGainCom :null,
  //   SaleTaxRatio :null,
  //   SaleTax  :null,
  //   SellingRetNo: null,
  //   AgentId: null,
  //   EntryUserId : Number(this.UserID),
  //   uuid:'',
  //   longId:'',
  //   EnterpriseId:null,
  //   BranchId:null,
  //   DiscValueExt:0,
  //   DiscRatioExt:0,
  //   sellingRetDets: [],
  //   CurrId :'',
  //   CurrName :'',
  //   CurrVal :null,
  //   CurrRate :null,
  //   FreeOfSalesTax:false,
  //   HasTaxGainCom :false,
  //   RefSellingId:null,
  //   }

  //   this.SalesSaleInvServ.formData.sellingRetDets = [];
  //   this.SalesSaleInvServ.GetMaxSellingRetsNo().subscribe(res => {
  //     this.SalesSaleInvServ.formData.SellingRetNo = res;

  //   }
  //   );


  // }


  // setSelectedBranch(res) {
  //   this.selectedBranch = res;
  // }

  // setSelectedActivityType(str){
  //   this.SelectedActivityTypeID = str;
  //   console.log( this.SelectedActivityTypeID , " this.SelectedActivityTypeID this.SelectedActivityTypeID")
  // }



  // getSaleInvs() {

  //   this.SalesSaleInvServ.getAllSellingRet(this.SalesSaleInvServ.formData.BranchId).subscribe(res => this.SalesSaleInvList = res);
  //   console.log(this.selectedBranch.BranchId,"listtttttt");
  // }

  // showSuccessAlert() {
  //   Swal.fire('Yikes!', 'Something went wrong!', 'success')
  // }



  // submitToETA() {





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

  //     var marvelHeroes = this.SalesSaleInvList.filter(function (hero) {
  //       return hero.isSelected == true;
  //     });


  //     let EInvMode =  sessionStorage.getItem('selectedType')
  //     console.log(this.SelectedActivityTypeID , "this.SelectedActivityType")
  //     this.SalesSaleInvServ.PostSellingRet(marvelHeroes,EInvMode,this.SelectedActivityTypeID).subscribe(
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
  //   this.toastr.info('تم ارسال المرتجع', 'مرتجع مبيعات');
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

  // // public isChecked$ = new BehaviorSubject(false);
  // // toggleChecked() {
  // //   this.isChecked$.next(!this.isChecked$.value)
  // // }

  // public isChecked$ = new BehaviorSubject(false);
  // toggleChecked(value:boolean) {
  //   if(value === true)
  //   {
  //     for(var i=0;i<this.SalesSaleInvList.length;i++)
  //     {
  //       this.SalesSaleInvList[i].isSelected = true;
  //     }
  //   }
  //   else
  //   {
  //     for(var i=0;i<this.SalesSaleInvList.length;i++)
  //     {
  //       this.SalesSaleInvList[i].isSelected = false;
  //       console.log(this.SalesSaleInvList[i]);
  //     }
  //   }


  // }
  // public onSellingSelectedChanged(value: boolean, SellingIndex: number) {
  //   console.log(this.SalesSaleInvList[SellingIndex]);
  //   this.SalesSaleInvList[SellingIndex].isSelected = value;
  // }

  // exportToFile(fileName: string, element_id: string) {

  // }

  // OnLogin(clientId: string, clientSecret: string ) {
  //   let EInvMode =  sessionStorage.getItem('selectedType')
  //  let  generatedAccessToken = this.access_token;
  //   this.ETAServ.Login(clientId, clientSecret ,EInvMode  )
  //     .subscribe((data: any) => {
  //       console.log(data);
  //       EInvMode =  sessionStorage.getItem('selectedType')

  //       //this.access_token = data.access_token;
  //       this.access_token = 'amir';

  //       localStorage.setItem('etaToken', data.access_token);
  //       this.errorMessage = null;
  //     },
  //       (err: HttpErrorResponse) => {
  //         console.log('false');
  //         //this.isLoginError = true;
  //         this.errorMessage = 'Error';
  //         console.log(this.errorMessage);
  //       });
  // }

  // logOut() {
  //   localStorage.removeItem('datatoken');
  //   localStorage.removeItem('etaToken')
  //   // this.router.navigate(['/allInv']);

  // }
}
