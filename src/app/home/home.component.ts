import { Component, OnInit, ViewChild } from '@angular/core';
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
import { SellingCount } from '../shared/Models/selling-count';


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
  SellingCount: SellingCount;
  SuppCount: SupplierCount;
  sellingList: Selling[];
  mSellings : MonthSellings[];
  UserType: string;


  constructor(private router: Router, private userService: UserService
    , private servHomeService: HomeService, private servSellingService: SellingService) {
      this.UserType = localStorage.getItem('UserType');
     }

  ngOnInit() {

    
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;     
    });

    this.servHomeService.get_Customer_Count().subscribe((data: any) => {
      this.CustCount = data;
      console.log( this.CustCount.Customer_Count , 'this.customerCount')
    });

    // this.servHomeService.get_Supplier_Count().subscribe((data: any) => {
    //   this.SuppCount = data;
    // });

    this.servSellingService.getTopTenSellings().subscribe((data: any) => {
      this.sellingList = data;
    });
    
    this.servHomeService.get_Selling_Count().subscribe((data: any) => {
      this.SellingCount = data;

      console.log( this.SellingCount , ' this.SellingCount')

    });

    this.servHomeService.getMonthSellings().subscribe((res: any) => {

      this.mSellings = res;
      let salesdata = []
      this.mSellings.forEach(contact => {
       
        salesdata.push(contact.SellingTot);
      });
    
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'],
          datasets: [{
            label: 'حجم المبيعات',
            data: salesdata,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    });

  }

  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('lUsr');
    this.router.navigate(['/login']);
  }

}
