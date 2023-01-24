import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm,FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Statement } from '../shared/Models/statement.model';
import { Accounts } from "../shared/Models/accounts.model";

import { AccIncListQService  } from '../shared/Services/acc-inc-list-q.service'


@Component({
  selector: 'app-rep-acc-statement',
  templateUrl: './rep-acc-statement.component.html',
  styleUrls: ['./rep-acc-statement.component.css']
})
export class RepAccStatementComponent implements OnInit {

//   selectedAccount : Accounts;
//   Accountslist : Accounts[];
//   Statmentlist : Statement[];
//   isValidFormSubmitted : boolean;
//   UserID : string;

//   stateCtrl = new FormControl();
//   filteredStates: Observable<Accounts[]>;


//   fromDate = new FormControl();
//   toDate = new FormControl(new Date());

//   userForm = new FormGroup({
//     Acnt: new FormControl('', Validators.required),
//  });

//   constructor(private servAccIncListQService: AccIncListQService) { }

  ngOnInit() {
    // this.getAccounts();

    // var today = new Date();
    // //today.setDate(today.getDate() - 30);
    // this.fromDate.patchValue(today);
  }

//   getAccounts() {
//    this.UserID = localStorage.getItem('lUsr');
//     this.servAccIncListQService.getAccounts(this.UserID).subscribe((data: any) => {
//       this.Accountslist = data;
//       this.filteredStates = this.stateCtrl.valueChanges
//       .pipe(
//         startWith(''),
//         map(value => typeof value === 'string' ? value : value.ItemName),
//         map(state => state ? this._filterStates(state) : this.Accountslist.slice())
//       );
//     },
//       (err: HttpErrorResponse) => {
//       });
//   }

//   private _filterStates(value: string): Accounts[] {
//     const filterValue = value.toLowerCase();
//     return this.Accountslist.filter(state => state.AccountName.toLowerCase().indexOf(filterValue) >= 0 );
//   }
//   displayFn(Item?: Accounts): string | undefined {
//     return Item ? Item.AccountName : undefined;
//   }


//   setSelectedAccount(str) {
//     this.selectedAccount = str;
//   }


//   Saveform() : void {
//     this.isValidFormSubmitted = false;
//     if(this.stateCtrl.value != '')
//      this.selectedAccount = this.stateCtrl.value;
//      else
//      this.selectedAccount = null;

//      console.log(this.selectedAccount.ACCOUNTID);

//      //if (this.userForm.invalid) {
//      //   return;
//      //}

//      console.log(this.selectedAccount.ACCOUNTID);

//      this.isValidFormSubmitted = true;
//      this.fromDate.value.setMinutes( this.fromDate.value.getMinutes() - this.fromDate.value.getTimezoneOffset() );
//      this.toDate.value.setMinutes( this.toDate.value.getMinutes() - this.toDate.value.getTimezoneOffset() );
//     this.servAccIncListQService.getStatement(this.selectedAccount.ACCOUNTID,this.fromDate.value.toISOString().substring(0, 10),this.toDate.value.toISOString().substring(0, 10)).subscribe(res=> this.Statmentlist = res) ;
//   }

//   openSite(siteUrl) {
//     window.open( siteUrl, '_blank');
//  }

}
