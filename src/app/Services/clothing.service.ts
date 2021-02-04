import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Clothing } from '../interfaces/clothing.model';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class ClothingService {

  currentUser: any;

  constructor( private firestore: AngularFirestore, private afAuth: AuthenticationService ) { 
    this.currentUser = afAuth.currentUser.uid;
  }

  // createClothing(data: any) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.firestore
  //     .collection("clothing")
  //     .add(data)
  //     .then(res => {}, err => reject(err));
  //   });
  // }

  createClothing(clothing: Clothing) {
    // return this.firestore.collection('clothing').add(clothing);
    return this.firestore.collection('users').doc(this.currentUser).collection('clothing').add(clothing);
  }

  updateClothing(data: any) {
    return this.firestore
    .collection("clothing")
    .doc(data.payload.doc.id)
    .set({ completed: true}, {merge: true });
  }

  getClothing() {
    return this.firestore.collection('users').doc(this.currentUser).collection('clothing').snapshotChanges();
  }

  deleteClothing(data: any) {
    return this.firestore
    .collection("clothing")
    .doc(data.payload.doc.id)
    .delete();
  }
}
