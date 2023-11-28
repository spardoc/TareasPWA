import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TareasFirebaseService } from 'src/app/services/tareas-firebase.service';
import { Tarea } from 'src/domain/tarea';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent {
  tarea :Tarea = new Tarea();
  listaTareas: any

  constructor(private router: Router,
    private tareasFireBaseService : TareasFirebaseService)
  {
    this.listaTareas = this.tareasFireBaseService.getAll()
    let params = this.router.getCurrentNavigation()?.extras.queryParams

    if(params)
    {
      console.log(params)
      this.tarea = params['tarea']
    }
  }

  saveTarea() // Metodo que se llama al momento de hacer click en el boton de guardar, para guardar la tarea en nuestra base.
  {
      this.tareasFireBaseService.save(this.tarea);
      this.tarea = new Tarea();
      this.router.navigate(['pages/lista-tareas'])
  }

  goListado() // Para ir al listado de tareas
  {
    console.log("Llamando lista de tareas")
    this.router.navigate(['pages/lista-tareas'])
  }
}
