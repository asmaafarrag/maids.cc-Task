import { ServStockService } from 'src/app/shared/Services/serv-stock.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { VacOrdersService } from 'src/app/shared/Services/vac-orders.service';
import { NgForm,FormControl, FormGroup, Validators } from '@angular/forms';
//import {MatButtonModule, MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatFormField} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/shared/Models/customer.model';

import { PriceLists, PriceListDet } from 'src/app/shared/Models/price-lists';
import { PriceListsService } from 'src/app/shared/Services/price-lists.service';
import { CustomerService } from 'src/app/shared/Services/customer.service';
import { PriceListItemComponent } from '../price-list-item/price-list-item.component';
import { CustSlidesService } from 'src/app/shared/Services/cust-slides.service';
import { CustSlides } from 'src/app/shared/Models/cust-slides';
import { Item } from 'src/app/shared/Models/item';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

 
  CustSlideslist:CustSlides[];
  customerslist: Customer[];
  CurrentEmpId : number;
  selectedSalBand: PriceLists;
  isEnabled: boolean = true;
  itemslist: Item[];
  isValid: boolean = true;


  selectedItem: Item;
  selectedCustomer: Customer;
  UserID: string;
  UserType: string;
  EmpID: string;
  CusName:Customer;
  
  today: Date = new Date();
  ItemsCount: number = 0;
  DiscRatioval:number = 0;



  constructor(public PriceListsServ: PriceListsService, public CustomerServ:CustomerService, private customerSlideServ:CustSlidesService
    ,public servStockService:ServStockService,private dialog: MatDialog, public datepipe: DatePipe, private vOrderServ : VacOrdersService ,private toastr: ToastrService ,public currentRoute: ActivatedRoute, private router: Router) { 

  this.EmpID = localStorage.getItem('EmpID');

  }

  ngOnInit() {
     
    this.CurrentEmpId = parseInt( localStorage.getItem('EmpID'));
   
    this.resetform();
  
    this.customerSlideServ.getCustSlides().subscribe(res => this.CustSlideslist = res);
  
   
    this.servStockService.getCustomers().subscribe(res => this.customerslist = res);
   
   
    let Id = this.currentRoute.snapshot.paramMap.get('id')
 
    if (Id != null)
      this.populateForm(parseInt(Id));
  }
 


  resetform(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.PriceListsServ.formData = {
      PriceListID:-1,
      PriceListName :'',
      PriceListNotes :'',
        PriceListVal:null,
        PriceListDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
        CustomerId :null,
        custnam :'',
        EmpResp :'',
        RespName :'',
        StoreId:null,
        ListTimeFrom :'',
        ListTimeTo :'',
        ListTime :'',
        ListDisc :null,
        PayCond :'',
        TaxComm :null,
        SaleTax :null,
        ListCond :'',
        NetAfterDisc :null,
        NetAfterTaxComm :null,
        Net :null,
        RecPlace:'',
        ListData :'',
        TelNo :'',
        EMail:'',
        FaxNo:'',
        PriceListDets:[],    
    }
    this.PriceListsServ.formData.PriceListDets = [];
  }



  populateForm(Id: number) {
    this.PriceListsServ.getPriceListsById(Id).subscribe(res => {
      this.PriceListsServ.formData = res;

      // this.selectedCustomer = new Customer();
      // this.selectedCustomer.CustomerID = this.PriceListsServ.formData.CustomerId;
      // this.selectedCustomer.CustomerName = this.PriceListsServ.formData.custnam;

      //this.addServ.formData.addDets = res.addDets
    });
  }


  showSuccess() {
    this.toastr.success('تم حفظ عرض السعر', 'عرض السعر');
  }

  showError() {
    this.toastr.error('خطأ فى حفظ عرض السعر', 'عرض السعر');
  }

  validateForm() {
    this.isValid = true;

    if (this.PriceListsServ.formData.PriceListDate == null || this.PriceListsServ.formData.PriceListDate == '')
    this.isValid = false;

   
    else if (this.PriceListsServ.formData.custnam == null || this.PriceListsServ.formData.custnam == '')
    this.isValid = false;

   else if (this.PriceListsServ.formData.CustomerId == null || this.PriceListsServ.formData.CustomerId == '')
    this.isValid = false;

   else if(this.PriceListsServ.formData.PriceListDets.length == 0)
    this.isValid = false;
 

    return this.isValid;
  }


  openForEdit(Id: number) {
    this.router.navigate(['/PriceList/edit/' + Id]);
  }

  validateForPopUp() {
    this.isValid = true;

    if (this.PriceListsServ.formData.PriceListDate == null || this.PriceListsServ.formData.PriceListDate == '')
    this.isValid = false;

    else if (this.PriceListsServ.formData.custnam == null || this.PriceListsServ.formData.custnam == '')
    this.isValid = false;

   else if (this.PriceListsServ.formData.CustomerId == null || this.PriceListsServ.formData.CustomerId == '')
    this.isValid = false;

    


    return this.isValid;
  }





  onSubmit(form: NgForm) {
  
    if (this.validateForm()) {
      this.isEnabled = false;

      if (this.PriceListsServ.formData.PriceListID == -1) {
        this.PriceListsServ.postPriceLists().subscribe(
          res => {
            this.showSuccess();
            this.resetform();
            this.isEnabled = true;
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }
      else {
        console.log('w');
        this.PriceListsServ.putPriceLists().subscribe(
          res => {
            this.showSuccess();
            this.router.navigate(['/PriceListsView']);
            this.isEnabled = true;
  
          },
          err => { console.log(err); this.showError(); this.isEnabled = true; }
        )
      }
    }
    
  }

  AddOrEditSalInvItems(orderItemIndex, SellingId) {
    if (this.validateForPopUp()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "100%";
       var StoreId = this.PriceListsServ.formData.StoreId;
      dialogConfig.data = { orderItemIndex,SellingId , StoreId };
      this.dialog.open(PriceListItemComponent, dialogConfig).afterClosed().subscribe(res => { this.calcItemsQty(); this.calcGrandTotal();});
    }
  }

  onDeleteSalInvItems(SerNo: number, i: number) {
    this.PriceListsServ.formData.PriceListDets.splice(i, 1);
    this.calcGrandTotal();
    this.calcItemsQty();
  }

  calcItemsQty() {
    let sum: number = 0;
    this.PriceListsServ.formData.PriceListDets.forEach(a => sum += parseInt(a.Qty.toString()));
    this.ItemsCount = sum;
  }

  
  calcGrandTotal() {
    this.PriceListsServ.formData.PriceListVal = this.PriceListsServ.formData.PriceListDets.reduce((prev, curr) => { return prev + curr.tot }, 0);
    this.PriceListsServ.formData.PriceListVal = parseFloat((this.PriceListsServ.formData.PriceListVal).toFixed(2));

    
    this.PriceListsServ.formData.Net = parseFloat((this.PriceListsServ.formData.PriceListVal - this.PriceListsServ.formData.ListDisc).toFixed(2));

  }


  

  // calcItemsQty8() {
  //   let sum2: number = 0;
  //   this.PriceListsServ.formData.saleInvItems.forEach(a => sum2 += parseInt(a.DiscRatio.toString()));
  //    this.DiscRatioval = sum2;

  //    this.PriceListsServ.formData.SellingDiscRatio= sum2;
  // }

  // calcDiscValue() {
  //   this.PriceListsServ.formData.SellingDisc = parseFloat((this.PriceListsServ.formData.SellingTot * this.PriceListsServ.formData.SellingDiscRatio / 100).toFixed(2));

    
  //   this.PriceListsServ.formData.PriceListVal = parseFloat((this.PriceListsServ.formData.SellingTot - this.PriceListsServ.formData.SellingDisc + this.PriceListsServ.formData.SaleTax).toFixed(2));
  // }

  // calcDiscRatio() {

  //   this.PriceListsServ.formData.SellingDiscRatio = parseFloat((this.PriceListsServ.formData.SellingDiscRatio / this.PriceListsServ.formData.SellingTot * 100).toFixed(2));
  //   this.PriceListsServ.formData.PriceListVal = parseFloat((this.PriceListsServ.formData.SellingTot - this.PriceListsServ.formData.SellingDisc  + this.PriceListsServ.formData.SaleTax).toFixed(2));

  // }

  // calcGrandTotal() {
  //   this.PriceListsServ.formData. = this.PriceListsServ.formData.PriceListDets.reduce((prev, curr) => { return prev + curr.tot }, 0);
  //   this.PriceListsServ.formData.SellingTot = parseFloat((this.PriceListsServ.formData.SellingTot).toFixed(2));  //total 

  //   this.PriceListsServ.formData.SellingDisc = this.PriceListsServ.formData.PriceListDets.reduce((prev, curr) => { return prev + curr. }, 0);
  //   // this.PriceListsServ.formData.SellingDisc = parseFloat((this.PriceListsServ.formData.SellingDisc).toFixed(2));  //total 
  //   this.PriceListsServ.formData.SellingDiscRatio = this.PriceListsServ.formData.PriceListDets.reduce((prev, curr) => { return prev + curr.DiscRatio }, 0);

  //   console.log( this.PriceListsServ.formData.SellingDisc ,' this.PriceListsServ.formData.SellingDisc')
  //   // this.PriceListsServ.formData.SaleTax = this.PriceListsServ.formData.saleInvItems.reduce((prev, curr) => { return prev + curr.ItmSaleTax }, 0);
  //   // this.PriceListsServ.formData.SaleTax = parseFloat((this.PriceListsServ.formData.SaleTax).toFixed(2));



  //   this.PriceListsServ.formData.SaleTax = this.PriceListsServ.formData.PriceListDets.reduce((prev, curr) => { return prev + curr.DetTaxSal }, 0);
  //   this.PriceListsServ.formData.SaleTax = parseFloat((this.PriceListsServ.formData.SaleTax).toFixed(2));

    
  //   //الضرائب
  //   // this.PriceListsServ.formData.SaleTax = this.PriceListsServ.formData.saleInvItems.reduce((prev, curr) => { return prev + curr.DetTaxSal }, 0);
  //   // this.PriceListsServ.formData.SaleTax = parseFloat((this.PriceListsServ.formData.SaleTax).toFixed(2));




  //   // الnet
  //   this.PriceListsServ.formData.PriceListVal = parseFloat((this.PriceListsServ.formData.PriceListVal  - this.PriceListsServ.formData.SellingDisc   + this.PriceListsServ.formData.SaleTax  ).toFixed(2));
  //   this.PriceListsServ.formData.PriceListVal = parseFloat((this.PriceListsServ.formData.SellingTot  + this.PriceListsServ.formData.SaleTax -  this.PriceListsServ.formData.SellingDisc ).toFixed(2));

  //   // this.PriceListsServ.formData.PriceListVal = parseFloat((this.PriceListsServ.formData.PriceListVal - this.PriceListsServ.formData.SellingDisc).toFixed(2));
  //   // console.log(this.PriceListsServ.formData.SaleTax);
  // }



 

}
