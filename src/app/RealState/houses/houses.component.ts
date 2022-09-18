import { Component, OnInit , Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

import { RealStateHouses } from 'src/app/shared/Models/real-state-houses';

import { RealStateHousesService } from 'src/app/shared/Services/real-state-houses.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {

  constructor(public service: RealStateHousesService) { }

  HousesList: RealStateHouses[];
  HH : any;

  ngOnInit() {
    this.getHouses();
    
  }

  getHouses() {
    this.service.getHouses().subscribe(res => this.HousesList = res);
    
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

getClass(priority){
  
  return {'btn-success': priority === 0,
                'btn-warning': priority === 1, 
                'btn-danger': priority=== 2}

}


 
}
