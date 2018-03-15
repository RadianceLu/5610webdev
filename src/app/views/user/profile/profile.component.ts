import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  updateUser(changed_user) {
    this.route.params.subscribe(params => {
      return this.userService.updateUser(changed_user).subscribe(
        (user: User) => {
          this.user = user;
        }
      );
    });
  }

  deleteUser(userId) {
    this.userService.deleteUser(userId).subscribe();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      return this.userService.findUserById(params['uid']).subscribe(
        (user: User) => {
          this.user = user;
        }
      );
    });
  }

}
