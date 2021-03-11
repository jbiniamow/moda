import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import firebase from 'firebase';
import { AuthenticationService } from '../Services/authentication.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  username: any;
  toggleSearch: boolean = false;
  searchText: string = '';
  constructor(public authService: AuthenticationService, public dialog: MatDialog) {
   }

  ngOnInit(): void {
  }

  openAboutDialog() {
    const dialogRef = this.dialog.open(AppBarAboutDialog, {restoreFocus: false});
  }

  getUserAdditionalData = (user: firebase.User) => {
    this.username = user.displayName;
  }

  clearSearch() {
    this.toggleSearch = false;
    this.searchText = '';
  }

}

@Component({
  selector: 'app-bar-about-dialog',
  templateUrl: 'app-bar-about-dialog.html',
})
export class AppBarAboutDialog {}
