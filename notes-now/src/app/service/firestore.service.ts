import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  /**** Crear Documento en una colección****/
  createDoc(data: any, path: string, id: any) {
    const colletion = this.firestore.collection(path);
    return colletion.doc(id).set(data);
  }
}
