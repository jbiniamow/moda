import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  return = '';
  error: any;
  googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
  ) {}

  loginGoogle() {
    this.afAuth.signInWithRedirect(this.googleAuthProvider).then(
      (success) => {
        this.router.navigate([this.return]);
      }).catch(
        (err) => {
          this.error = err;
        });
  }

  loginEmail() {
    this.router.navigate(['/email'], {
      queryParams: {
        return: this.return
      }
    });
  }

}
