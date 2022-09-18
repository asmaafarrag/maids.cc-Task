import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/Services/user.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-nav-bar-header',
  templateUrl: './nav-bar-header.component.html',
  styleUrls: ['./nav-bar-header.component.css']
})
export class NavBarHeaderComponent implements OnInit {


  User:any = '';
  constructor(private router: Router, public userService: UserService) { }

  ngOnInit() {
    interval(10000).subscribe(x => {
      this.User = localStorage.getItem('userName')

    });
    this.User = localStorage.getItem('userName')

  }

  logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('stageTypeId');
    localStorage.removeItem('clientspage');
    localStorage.removeItem('clientId');

    this.router.navigate(['/Login']);
  }
  
}
