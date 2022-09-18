import { Component, OnInit , Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

import { RealStateReserveUnits } from 'src/app/shared/Models/real-state-reserve-units';

import { RealStateReserveUnitsService } from 'src/app/shared/Services/real-state-reserve-units.service';

@Component({
  selector: 'app-reserve-units',
  templateUrl: './reserve-units.component.html',
  styleUrls: ['./reserve-units.component.css']
})
export class ReserveUnitsComponent implements OnInit {

  constructor(public service: RealStateReserveUnitsService) { }

  ReserveUnitsList: RealStateReserveUnits[];

  ngOnInit() {
    this.ReserveUnits();
  }

  ReserveUnits() {
    this.service.getReserveUnits().subscribe(res => this.ReserveUnitsList = res);
    
  }

}
