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

  /**** Agregar notas a la colección****/
  AddNoteFb(note: Interface): Promise<any> {
    return this.firestore.collection('NotesNew').add(note)
  }

  /**** Obtener notas de la colección****/
  getNotes() {
    return this.firestore.collection('NotesNew', ref => ref.orderBy('date', 'desc')).snapshotChanges();
  }

  /**** Editar notas de la colección****/
  editNotes(id: string, registro: any): Promise<any> {
    return this.firestore.collection('NotesNew').doc(id).update(registro)
  }
  /**** Eliminar notas de la colección****/
  deleteNotes(id: string): Promise<any> {
    return this.firestore.collection('NotesNew').doc(id).delete()
  }
  /**** Agregar notas a la colección de Eliminados****/
  addNoteDelete(note: Interface): Promise<any> {
    return this.firestore.collection('deleteNote').add(note)
  }
  /**** Cambiar status de las notas en la coleccion a notas archivadas o eliminadas****/
  statusNotes(idOrder: any, noteStatus: any) {
    return this.firestore.collection('NotesNew').doc(idOrder).update({ status: noteStatus });
  }

}
