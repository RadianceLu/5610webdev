import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  username: String;
  firstName: String;
  lastName: String;
  password: String;
  verifyPassword: String;
  passwordErrorFlag: boolean;
  passwordErrorMsg: 'password does not macth';
  userErrorFlag: boolean;
  userErrorMsg: 'User exists!';

  user: User;
  constructor(private userService: UserService, private router: Router,
              private activatedRouter: ActivatedRoute) { }
  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verifyPassword = this.registerForm.value.password;
    this.firstName = this.registerForm.value.firstName;
    this.lastName = this.registerForm.value.lastName;

    if (this.password !== this.verifyPassword) {
      this.passwordErrorFlag = true;
    }
    if (this.userService.findUserByCredential(this.username, this.password)) {
      this.userErrorFlag = true;
    }

    // const user: User = new User(new Date().getTime() + '', this.username, this.password, this.firstName, this.lastName);
    this.user = new User(new Date().getTime() + '', this.username, this.password, this.firstName, this.lastName);
    this.userService.createUser(this.user).subscribe(
      (data: any) => {
        this.user = data;
        this.router.navigate(['/profile', this.user._id]);
        // this.router.navigate(['/login']);
      }
    );
  }

  ngOnInit() {
  }

}
