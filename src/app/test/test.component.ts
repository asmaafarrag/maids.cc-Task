import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  tab2:boolean = false;
  tab3:boolean = false;
  panelOpenState = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  tab2Clicked(){
    this.tab2 = true
    this.router.navigateByUrl('/UnSubmitedItemView');

    console.log(this.tab2, "2")
  }

  tab3Clicked(){
    this.tab3 = !this.tab3
  }


}
