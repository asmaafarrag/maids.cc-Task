import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/Models/user.model';
import { UserService } from '../shared/Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User;
  
  // Property to check the form is dirty or not
  @ViewChild('userRegistrationForm', { static: true }) public createUserForm: NgForm;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      UserId:null,
      UserName: '',
      Password: '',
      FirstName: '',
      LastName: '',
      CustomerInfoConnStr: ''
    };
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded === true) {
          this.resetForm(form);
          this.router.navigate(['/Login']);
        }
        else
        console.log(data.Errors[0]);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

}
