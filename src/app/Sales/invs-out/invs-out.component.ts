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

import { Accounts } from '../../shared/Models/accounts.model';
import { Treasury } from '../../shared/Models/treasury';
import { SalesInv } from '../../shared/Models/sales-inv';

import { AccIncListQService  } from '../../shared/Services/acc-inc-list-q.service'

import { Alignment } from 'pdfmake/interfaces';


import { strGnuMICR } from '../../GnuMICR.ttf.Base64.encoded';
import { ToastrService } from 'ngx-toastr';
import { InvsService } from 'src/app/shared/Services/invs.service';
import { TreasuryService } from 'src/app/shared/Services/treasury.service';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-invs-out',
  templateUrl: './invs-out.component.html',
  styleUrls: ['./invs-out.component.css']
})
export class InvsOutComponent implements OnInit {

  UserID : string;
  UserType: string;
  accountslist: Accounts[];
  treasurylist: Treasury[];
  
  selectedAccount: Accounts;
  selectedTreasury: Treasury;

  isValid: boolean = true;
  isEnabled: boolean = true;

  today: Date = new Date();
  ItemsCount: number = 0;
  alignmentCenter: Alignment = 'center';
  alignmentRight: Alignment = 'right';
  alignmentLeft: Alignment = 'left'

  constructor(public InvService: InvsService,private servAccIncListQService: AccIncListQService , private treasuryServ : TreasuryService
    , private dialog: MatDialog, private toastr: ToastrService, public datepipe: DatePipe, public currentRoute: ActivatedRoute, private router: Router) {
      this.UserID = localStorage.getItem('lUsr');
      this.UserType = localStorage.getItem('UserType');
  }

  ngOnInit() {
    let InvId = this.currentRoute.snapshot.paramMap.get('id')
    console.log(InvId);
    this.getAccounts();
    this.getTreasury();
    this.resetForm();

    this.selectedAccount = new Accounts();
    //this.selectedTreasury.TreasuryId = 1;

    if (InvId != null)
    this.populateForm(parseInt(InvId));
  }

  populateForm(InvId: number) {
    this.InvService.getInvById(InvId).subscribe(res =>  
      {
        this.InvService.formData = res;        
      } );
  }

  getNewValue(ev: any): any {
    
}

  getDate = function (date: any): Date {
    const _date = new Date(date);
    return new Date(
      Date.UTC(_date.getFullYear(), _date.getMonth(), _date.getDate())
    );
  };

  getAccounts() {
    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.servAccIncListQService.getAllAccounts().subscribe(res=> this.accountslist = res) ;   
    }
    else {
      this.servAccIncListQService.getAccount(this.UserID).subscribe(res=> this.accountslist = res) ;   
    }
    // this.servAccIncListQService.getAllAccounts().subscribe(res=> this.accountslist = res) ;   

    //this.UserID = localStorage.getItem('lUsr');
   }

  getTreasury() {
    if (this.UserType.toUpperCase() == 'ADMIN') {
      this.treasuryServ.getTreasurys().subscribe(res => this.treasurylist = res);
    }
    else {
      this.treasuryServ.getTreasurysByUser(this.UserID).subscribe(res => this.treasurylist = res);
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.InvService.formData = {

      InvID : -1,
        Val : null,
        InvDate :new Date(),
        InvNotes : '',
        InvType : 'S',
        billno : '',
        accountId : '',
        AccountName : '',
        TreasuryId : null,
        TreasuryName : '',
        Disc : 0,
        CostCenterId  : null,
        EntryUserId :  Number(this.UserID),
        EntryUserDate:''
    }

    
    this.InvService.GetMaxInvsNo().subscribe(res => {
      this.InvService.formData.billno = res.toString();

    }
    );


  }

  
  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.isEnabled = false;
      console.log(this.InvService.formData.InvDate);
      if (this.InvService.formData.InvID == -1) {
      this.InvService.postInv().subscribe(
        res => {
          this.showSuccess();
          this.resetForm();
          this.isEnabled = true;
        },
        err => { console.log(err); this.isEnabled = true;}
      )
      } else
      {
        this.InvService.putInv().subscribe(
          res => {
            this.showSuccess();           
            //this.resetForm();
            this.isEnabled = true;
          },
          err => { console.log(err);  this.isEnabled = true; }
        )
      }
    }
  }


  showSuccess() {
    this.toastr.success('تم حفظ سند الصرف', 'سند الصرف');
  }



  validateForm() {
    this.isValid = true;
    if (this.InvService.formData.TreasuryId == null || this.InvService.formData.TreasuryId == 0)
      this.isValid = false;
    else if (this.InvService.formData.accountId == null || this.InvService.formData.accountId == '')
      this.isValid = false;
    else if (this.InvService.formData.Val == null || this.InvService.formData.Val == 0)
      this.isValid = false;
    return this.isValid;
  }

  formateDate(date : Date){
    return this.datepipe.transform(date, 'yyyy-MM-dd');
   }

}
