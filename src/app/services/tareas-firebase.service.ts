import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Tarea } from 'src/domain/tarea';

@Injectable({
  providedIn: 'root',
})
export class TareasFirebaseService {
  private path = '/tareas';
  private tareasRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.tareasRef = db.collection(this.path);
    this.tareasRef.valueChanges().subscribe((data) => {
      console.log(data);
    });
  }

  getAll() {
    return this.tareasRef.valueChanges();
  }

  save(tarea: Tarea): void {
    if (navigator.onLine) {
      // Si hay conexión a Internet
      this.saveToFirestore(tarea);
    } else {
      // Si no hay conexión a Internet, guardar en Local Storage
      this.saveToLocal(tarea);
    }
  }

  private saveToFirestore(tarea: Tarea): void {
    // Verificar si la tarea ya existe en la colección
    this.checkIfExists(tarea).then((exists) => {
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

  private saveToLocal(tarea: Tarea): void {
    const storedData = localStorage.getItem('tareasPendientes');
    const tareasPendientes: Tarea[] = storedData ? JSON.parse(storedData) : [];
    tareasPendientes.push(tarea);
    localStorage.setItem('tareasPendientes', JSON.stringify(tareasPendientes));
  }
  

  private checkIfExists(tarea: Tarea): Promise<boolean> {
    return new Promise((resolve) => {
      this.tareasRef
        .doc(tarea.uid)
        .get()
        .subscribe((docSnapshot) => {
          resolve(docSnapshot.exists);
        });
    });
  }

  subirTareasPendientes(): void {
    console.log('Llamando a subir tareas pendientes')
    if (navigator.onLine) {
      const storedData = localStorage.getItem('tareasPendientes');
      if (storedData) {
        const tareasPendientes: Tarea[] = JSON.parse(storedData);
        tareasPendientes.forEach((tarea) => {
          this.saveToFirestore(tarea);
        });
  
        // Limpiar Local Storage después de subir las tareas
        localStorage.removeItem('tareasPendientes');
      }
    }
  }

  deleteTarea(tarea: Tarea) {
    this.tareasRef.doc(tarea.uid).delete();
  }

  getTarea(uid: string) {
    return this.db.doc(this.path + '/' + uid).valueChanges();
  }
}
