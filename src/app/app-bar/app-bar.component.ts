import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import firebase from 'firebase';
import { AuthenticationService } from '../Services/authentication.service';
import {MatDialog} from '@angular/material/dialog';
import { FilterService } from '../Services/filter.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  username: any;
  filterVisible: boolean = false;
  searchText: string = '';
  @Input() inputSideNav!: MatSidenav;
  constructor(public authService: AuthenticationService, public dialog: MatDialog, public filterService: FilterService) {}

  ngOnInit(): void {
  }

  openAboutDialog() {
    const dialogRef = this.dialog.open(AppBarAboutDialog, {restoreFocus: false});
  }

  getUserAdditionalData = (user: firebase.User) => {
    this.username = user.displayName;
  }

}

@Component({
  selector: 'app-bar-about-dialog',
  templateUrl: 'app-bar-about-dialog.html',
})
export class AppBarAboutDialog {}
