import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  return = '';
  error: any;
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async loginGoogle(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async logout(): Promise<boolean> {
    await this.afAuth.signOut();
    return this.router.navigate(['/login']);
  }

  private updateUserData(user: any): any {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    this.router.navigate(['/home']);
    return userRef.set(data, { merge: true });
  }

}
