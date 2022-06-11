import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Interface } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  /**** Crear Documento en una colección****/
  createDoc(data: any, name: string, id: any) {
    const colletion = this.firestore.collection(name); //se crea la coleccion 
    return colletion.doc(id).set(data); //Se agregan los datos a la coleccion creada 
  }

  AddNoteFb(note: Interface): Promise<any> {
    return this.firestore.collection('NotesNew').add(note)
  }

  getNotes() {
    return this.firestore.collection('NotesNew').valueChanges();
  }
}
