import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common'

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


import { Customer } from '../../shared/Models/customer.model';
import { CustDiscount } from '../../shared/Models/cust-discount';


import { ToastrService } from 'ngx-toastr';

import { CustDiscountService } from 'src/app/shared/Services/cust-discount.service';
import { ServStockService } from 'src/app/shared/Services/serv-stock.service';


@Component({
  selector: 'app-cust-discounts',
  templateUrl: './cust-discounts.component.html',
  styleUrls: ['./cust-discounts.component.css']
})
export class CustDiscountsComponent implements OnInit {

  UserID : string;
  UserType: string;
  EmpID: string;
  customerslist: Customer[];
  
  selectedCustomer: Customer;

  isValid: boolean = true;
  isEnabled: boolean = true;

  today: Date = new Date();

  constructor(public CustDiscountServ: CustDiscountService, private servStockService: ServStockService
    , private dialog: MatDialog, private toastr: ToastrService, public datepipe: DatePipe, public currentRoute: ActivatedRoute, private router: Router) {
      this.UserID = localStorage.getItem('lUsr');
      this.UserType = localStorage.getItem('UserType');
      this.EmpID = localStorage.getItem('EmpID');
  }

  ngOnInit() {
    let CustDiscId = this.currentRoute.snapshot.paramMap.get('id')
    this.getCustomers();
    this.resetForm();

    this.selectedCustomer = new Customer();
    //this.selectedTreasury.TreasuryId = 1;
    if (CustDiscId != null)
    this.populateForm(parseInt(CustDiscId));
  }

  populateForm(InvId: number) {
    this.CustDiscountServ.getCustDiscountById(InvId).subscribe(res =>  
      {
        this.CustDiscountServ.formData = res;
        console.log(res);




        this.selectedCustomer = new Customer();
        this.selectedCustomer.CustomerID = this.CustDiscountServ.formData.CustomerID;
        this.selectedCustomer.CustomerName = this.CustDiscountServ.formData.CustomerName;
      });

  
  }

  getCustomers() {
    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.servStockService.getCustomers().subscribe(res => this.customerslist = res);
    }
    else {
      this.servStockService.GetCustomersByEmpId(this.EmpID).subscribe(res => this.customerslist = res);
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.CustDiscountServ.formData = {
      CustDiscountId : -1,
      CustomerID : null,
      CustomerName : '',
      CustDiscountDate :new Date(),
      CustDiscountValue : null,
      CustDiscountNotes : '',
      CustDiscountNo : ''               
        //EntryUserId :  Number(this.UserID),
        //EntryUserDate:''
        
    }

    
    this.CustDiscountServ.GetMaxInvsNo().subscribe(res => {
      this.CustDiscountServ.formData.CustDiscountNo = res.toString();
    }
    );
  }

  
  onSubmit(form: NgForm) {
    if (this.validateForm()) {

      this.isEnabled = false;
      if (this.CustDiscountServ.formData.CustDiscountId == -1) {
        this.CustDiscountServ.postCustDiscount().subscribe(
          res => {
            this.showSuccess();           
            this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err);  this.isEnabled = true; }
        )
      }
      else {
        this.CustDiscountServ.postCustDiscount().subscribe(
          res => {
            this.showSuccess();           
            this.isEnabled = true;
          },
          err => { console.log(err);  this.isEnabled = true; }
        )
      }

      
    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ اشعار الخصم', 'اشعارات الخصم');
  }



  validateForm() {
    this.isValid = true;
    if (this.CustDiscountServ.formData.CustomerID == null || this.CustDiscountServ.formData.CustomerID == 0)
      this.isValid = false;
    else if (this.CustDiscountServ.formData.CustDiscountValue == null || this.CustDiscountServ.formData.CustDiscountValue == 0)
      this.isValid = false;
    return this.isValid;
  }


}
