import { Injectable } from '@angular/core';
import { Tarea } from 'src/domain/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasLocalService {
  tareas: Tarea[] = []
  constructor(){}

  addTarea(tarea: Tarea)
  {
    if(this.tareas.includes(tarea))
    {
      console.log('Actualizando', tarea)
    }
    else
    {
      console.log('Guardando nueva tarea en Local')
      this.tareas.push(tarea)
    }
  }

  getTareas()
  {
    return this.tareas
  }
  
  setTareas(tareas: Tarea[]) {
    this.tareas = tareas;
  }
}
