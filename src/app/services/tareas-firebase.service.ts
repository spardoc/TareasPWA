import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Tarea } from 'src/domain/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasFirebaseService {

  private path = '/tareas'

  tareasRef : AngularFirestoreCollection<any>

  constructor(private db:AngularFirestore) {//Conexion con la base de datos
    this.tareasRef = db.collection(this.path)
    this.tareasRef.valueChanges().subscribe(data => //Todos los cambios que se hagan se realiza lo que se ponga en el metodo
      {
        console.log(data)
      })
   } 

   getAll()
   {
    return this.tareasRef.valueChanges()
   }

   save(tarea: Tarea): void {
    // Verificar si la tarea ya existe en la colección
    this.checkIfExists(tarea).then(exists => {
      if (exists) {
        console.log('La tarea ya existe en la colección');
        console.log('Actualizando');
        this.tareasRef.doc(tarea.uid).update(Object.assign({}, tarea));
      } else {
        // Si no existe, guardar la tarea
        const uid = this.db.createId();
        tarea.uid = uid;
        this.tareasRef.doc(uid).set(Object.assign({}, tarea));
      }
    });
  }

  getTarea(uid: string) {
    return this.db.doc(this.path + '/' + uid).valueChanges();
  }

  // Nuevo método para verificar si la tarea existe
  private checkIfExists(tarea: Tarea): Promise<boolean> {
    return new Promise((resolve) => {
      this.tareasRef.doc(tarea.uid).get().subscribe((docSnapshot) => {
        resolve(docSnapshot.exists);
      });
    });
  }

  deleteTarea(tarea: Tarea)
  {
    this.tareasRef.doc(tarea.uid).delete();
  }
}
