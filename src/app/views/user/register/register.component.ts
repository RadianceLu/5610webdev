import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';

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

  constructor(private userService: UserService, private router: Router) { }
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

    const user: User = new User(new Date().getTime() + '', this.username, this.password, this.firstName, this.lastName);
    this.userService.createUser(user);
    this.router.navigate(['/profile', user._id]);
  }

  ngOnInit() {
  }

}
