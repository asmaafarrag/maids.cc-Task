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
  clientspage :string = "";
  
  constructor(private router: Router, public userService: UserService,private renderer: Renderer2) { 
    this.UserType = localStorage.getItem('UserType');
  }

  ngOnInit() {
    this.clientspage = localStorage.getItem("clientspage");

    interval(10000).subscribe(x => {
      this.UserType = localStorage.getItem('UserType');

    });
  }

  route(){
    if(localStorage.getItem("stageTypeId") == null){

      let clientspage = localStorage.getItem("clientspage");

      this.router.navigate(['CrmClients/' + clientspage])

    }
    else if(localStorage.getItem("stageTypeId") != null){

      let stageTypeId = localStorage.getItem("stageTypeId");
      // let clientId = localStorage.getItem("clientId");
      let clientspage = localStorage.getItem("clientspage");

      
      this.router.navigate(['CrmClients/view/'+ stageTypeId + '/' + clientspage ])

    }
  }

  

  toggleSideNav(): void {    
  
    $.app.menu.hidden = true;
   
    this.renderer.removeClass(document.body, 'menu-open');
    this.renderer.addClass(document.body, 'menu-hide');
   
  }
 

  logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('lUsr');
    localStorage.removeItem('EmpID');
    localStorage.removeItem('UserType');
    localStorage.removeItem('stageTypeId');
    localStorage.removeItem('clientspage');
    this.router.navigate(['/Login']);
  }
}
