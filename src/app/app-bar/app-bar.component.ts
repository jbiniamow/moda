import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  username: any;
  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  getUserAdditionalData = (user: firebase.User) => {
    this.username = user.displayName;
  }

}
