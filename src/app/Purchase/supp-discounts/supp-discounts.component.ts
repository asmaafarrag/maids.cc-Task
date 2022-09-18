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


import { Supplier } from '../../shared/Models/supplier';
import { SuppDiscount } from '../../shared/Models/supp-discount';


import { ToastrService } from 'ngx-toastr';

import { SuppDiscountService } from 'src/app/shared/Services/Supp-discount.service';
import { SupplierService } from 'src/app/shared/Services/supplier.service';

@Component({
  selector: 'app-supp-discounts',
  templateUrl: './supp-discounts.component.html',
  styleUrls: ['./supp-discounts.component.css']
})
export class SuppDiscountsComponent implements OnInit {

  UserID : string;
  UserType: string;
  EmpID: string;
  Supplierslist: Supplier[];
  
  selectedSupplier: Supplier;

  isValid: boolean = true;
  isEnabled: boolean = true;

  today: Date = new Date();

  constructor(public SuppDiscountServ: SuppDiscountService, private suppServ: SupplierService 
    , private dialog: MatDialog, private toastr: ToastrService, public datepipe: DatePipe, public currentRoute: ActivatedRoute, private router: Router) {
      this.UserID = localStorage.getItem('lUsr');
      this.UserType = localStorage.getItem('UserType');
      this.EmpID = localStorage.getItem('EmpID');
  }

  ngOnInit() {
    let SuppDiscId = this.currentRoute.snapshot.paramMap.get('id')
    this.getSuppliers();
    this.resetForm();

    this.selectedSupplier = new Supplier();
    //this.selectedTreasury.TreasuryId = 1;
    if (SuppDiscId != null)
    this.populateForm(parseInt(SuppDiscId));
  }

  populateForm(InvId: number) {
    this.SuppDiscountServ.getSuppDiscountById(InvId).subscribe(res =>  
      {
        this.SuppDiscountServ.formData = res;
        console.log(res);
      } );
  }

  getSuppliers() {
    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.suppServ.getSuppliers().subscribe(res => this.Supplierslist = res);
    }
    else {
      this.suppServ.getSuppliersByEmpId(this.EmpID).subscribe(res => this.Supplierslist = res);
    }
    // this.SupplierServ.getSuppliers().subscribe(res => { this.Supplierslist = res; console.log(this.Supplierslist) });
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.SuppDiscountServ.formData = {
      SuppDiscountId : -1,
      SupplierId : null,
      SupplierName : '',
      SuppDiscountDate :new Date(),
      SuppDiscountValue : null,
      SuppDiscountNotes : '',
      SuppDiscountNo : ''               
        //EntryUserId :  Number(this.UserID),
        //EntryUserDate:''
        
    }

    
    this.SuppDiscountServ.GetMaxInvsNo().subscribe(res => {
      this.SuppDiscountServ.formData.SuppDiscountNo = res.toString();
    }
    );
  }

  
  onSubmit(form: NgForm) {
    if (this.validateForm()) {
console.log('asd');
      this.isEnabled = false;
      if (this.SuppDiscountServ.formData.SuppDiscountId == -1) {
        this.SuppDiscountServ.postSuppDiscount().subscribe(
          res => {
            this.showSuccess();           
            this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err);  this.isEnabled = true; }
        )
      }
      else {
        this.SuppDiscountServ.postSuppDiscount().subscribe(
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
    
    if (this.SuppDiscountServ.formData.SupplierId == null || this.SuppDiscountServ.formData.SupplierId == 0)
     this.isValid = false;
    else if (this.SuppDiscountServ.formData.SuppDiscountValue == null || this.SuppDiscountServ.formData.SuppDiscountValue == 0)
     this.isValid = false;

      console.log(this.isValid);
    return this.isValid;
  }


}
