import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm,FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';

import {Observable, from} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { AccIncListQService  } from '../shared/Services/acc-inc-list-q.service'
import { AccInc, AccIncListQ } from '../shared/Models/acc-inc-list-q.model';

@Component({
  selector: 'app-rep-income-statment',
  templateUrl: './rep-income-statment.component.html',
  styleUrls: ['./rep-income-statment.component.css']
})
export class RepIncomeStatmentComponent implements OnInit {

  // selectedPeriod : number;
  // //AccIncList : AccIncListQ[];
  // AccIncQ : AccInc;

  // constructor(private servAccIncListQService: AccIncListQService) { }

  ngOnInit() {
    // this.AccIncQ = {MFirstName:'1',MSecondName:'2',MThirdName:'3',AccIncItems:null}
  }

  // setPeriod(str) {
  //   this.selectedPeriod = str;
  // }

  // Saveform() : void {
  //   this.servAccIncListQService.getAccIncListQ(this.selectedPeriod).subscribe(res=> this.AccIncQ = res) ;
  // }

}
