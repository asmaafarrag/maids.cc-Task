import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/Services/user.service';
import { User } from '../shared/Models/user.model';
import { Chart } from 'chart.js';
import { HomeService } from '../shared/Services/home.service.service';
import { CustomerCount } from '../shared/Models/customer-count';
import { SupplierCount } from '../shared/Models/supplier-count';
import { SellingService } from '../shared/Services/selling.service.service';
import { Selling } from '../shared/Models/selling';
import { MonthSellings } from '../shared/Models/month-sellings';
import { CustomerService } from '../shared/Services/customer.service';
import { SalesSaleInvService } from '../shared/Services/sales-sale-inv.service';
import { SalesInv } from '../shared/Models/sales-inv';
import { SalesSaleInv } from '../shared/Models/sales-sale-inv';
import { Customer } from '../shared/Models/customer.model';
import { Json } from '@angular/router-deprecated/src/facade/lang';
import { SellingCount } from '../shared/models/selling-count';
import { ItemCount } from '../shared/Models/item-count';
import { SellingRet } from '../shared/Models/selling-ret';
import { UsersCount } from '../shared/models/users-count';
import { SellingRetCount } from '../shared/models/selling-ret-count';
// import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userClaims: User;
  ctx: any;
  chart = []; // This will hold our chart info
  CustCount: CustomerCount;
  SuppCount: SupplierCount;
  SellingCount: SellingCount;
  sellingRetCount:SellingRetCount ;
  itemCount:ItemCount;
  userCount:UsersCount
  sellingList: Selling[];
  mSellings : MonthSellings[];
  UserType: string;
  UserID: string;
  EmpID : string;
  entrpriseId:string;
  pageSize: number = 5;
  pageSizes = [5, 10, 20];
  title: string = '';
  page: number = 1;
  count1: number = 0;
  count2:number = 0;




  constructor(private router: Router, private userService: UserService, private CustServ: CustomerService,
    private SalesSaleInvServ: SalesSaleInvService ,@Inject(DOCUMENT) private document: Document
    ,private servHomeService: HomeService, private servSellingService: SellingService ,
    public location :Location) {
    this.UserType = localStorage.getItem('UserType');
    this.EmpID =localStorage.getItem('EmpID');
        // translate.setDefaultLang('ar');
        // translate.use('ar')
        // localStorage.setItem('lang', 'ar' );
  }


  openForEdit(saleInvId: number) {
    this.router.navigate(['/Invoice/edit/' + saleInvId]);
  }

  ngOnInit() {
    // const firstTimeH = localStorage.getItem('key')
    // if(!firstTimeH){
    //  localStorage.setItem('key','loaded')
    //  location.reload()
    // }else {
    //   localStorage.removeItem('key')
    // }

    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
    });

    this.servHomeService.get_Customer_Count().subscribe((data: any) => {
      this.CustCount = data;
      console.log( this.CustCount , ' this.CustCount')
    });




    // this.servHomeService.get_Supplier_Count().subscribe((data: any) => {
    //   this.SuppCount = data;

    //   console.log( this.SuppCount , ' this.SuppCount')

    // });

    this.servHomeService.get_item_Count().subscribe((data: any) => {
      this.itemCount = data;

      console.log( this.itemCount , ' this.itemCount')

    });


    this.servHomeService.get_Selling_Count().subscribe((data: any) => {
      this.SellingCount = data;

      console.log( this.SellingCount , ' this.SellingCount')

    });

    this.servHomeService.get_SellingRet_Count().subscribe((data: any) => {
      this.sellingRetCount = data;

      console.log( this.sellingRetCount , ' this.sellingRetCount')

    });


    this.servHomeService.get_user_Count().subscribe((data: any) => {
      this.userCount = data;

      console.log( this.userCount , ' this.userCount')

    });




    this.servSellingService.getTopTenSellings().subscribe((data: any) => {
      this.sellingList = data;

      console.log( this.sellingList , ' this.sellingList')

    });


    // this.servHomeService.getMonthSellings().subscribe((res: any) => {
    //   console.log(this.mSellings , 'msellings')

    //   this.mSellings = res;
    //   let salesdata = []
    //   this.mSellings.forEach(contact => {

    //     salesdata.push(contact.SellingTot);
    //   });

    //   this.chart = new Chart('canvas', {
    //     type: 'line',
    //     data: {
    //       labels: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'],
    //       datasets: [{
    //         label: 'حجم المبيعات',
    //         data: salesdata,
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(54, 162, 235, 0.2)',
    //           'rgba(255, 206, 86, 0.2)',
    //           'rgba(75, 192, 192, 0.2)',
    //           'rgba(153, 102, 255, 0.2)',
    //           'rgba(255, 159, 64, 0.2)'
    //         ],
    //         borderColor: [
    //           'rgba(255, 99, 132, 1)',
    //           'rgba(54, 162, 235, 1)',
    //           'rgba(255, 206, 86, 1)',
    //           'rgba(75, 192, 192, 1)',
    //           'rgba(153, 102, 255, 1)',
    //           'rgba(255, 159, 64, 1)'
    //         ],
    //         borderWidth: 1
    //       }]
    //     },
    //     options: {
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       }
    //     }
    //   });
    // });

  }



  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('lUsr');
    this.router.navigate(['/login']);
  }

}
