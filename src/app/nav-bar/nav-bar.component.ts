import { Component, OnInit , Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/Services/user.service';
//import { Console } from '@angular/core/src/console';
import { data } from '../../assets/app-assets/js/core/app-menu.js';
import { interval } from 'rxjs';

declare var $:any;
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  UserType: string;
  t : boolean = false;
  openu = false;
  u : boolean = false;

  constructor(private router: Router, public userService: UserService,private renderer: Renderer2) {
    this.UserType = localStorage.getItem('UserType');
  }

  ngOnInit() {
  }




  toggleSideNav(): void {

    $.app.menu.hidden = true;

    this.renderer.removeClass(document.body, 'menu-open');
    // this.renderer.addClass(document.body, 'menu-hide');

  }

  open(){
    this.t = ! this.t;
  }

  openn(){
    this.u = ! this.u;
  }


  logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('lUsr');
    localStorage.removeItem('EmpID');
    localStorage.removeItem('UserType');
    this.router.navigate(['/Login']);
  }
}
