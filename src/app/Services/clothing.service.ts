import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Clothing } from '../interfaces/clothing.model';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class ClothingService {

  constructor( private firestore: AngularFirestore, private afAuth: AuthenticationService ) {}

  createClothing(clothing: Clothing) {
    var currentUser = this.afAuth.currentUser.uid;
    return this.firestore.collection('users').doc(currentUser).collection('clothing').add(clothing);
  }

  updateClothing(data: any) {
    return this.firestore
    .collection("clothing")
    .doc(data.payload.doc.id)
    .set({ completed: true}, {merge: true });
  }

  getClothing() {
    var currentUser = this.afAuth.currentUser.uid;
    return this.firestore.collection('users').doc(currentUser).collection('clothing').snapshotChanges();
  }

  deleteClothing(data: any) {
    var currentUser = this.afAuth.currentUser.uid;
    if (confirm('Delete?')) {
      this.firestore.collection('users').doc(currentUser).collection('clothing').doc(data.id).delete();
    }
  }
}
