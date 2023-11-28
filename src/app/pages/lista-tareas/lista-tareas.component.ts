import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TareasFirebaseService } from 'src/app/services/tareas-firebase.service';
import { Tarea } from 'src/domain/tarea';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.scss']
})
export class ListaTareasComponent {

  listaTareas: any

  constructor( private router: Router, private tareasFirebaseService: TareasFirebaseService)
  {
    this.listaTareas = this.tareasFirebaseService.getAll() //Obtenemos las tareas de nuestra base
  }

  goEditar(tarea: any) // Para que se muestre la informacion de la tarea al momento de hacer click
  {
    console.log('Editando', tarea)
    let params: NavigationExtras =
    {
      queryParams:
      {
        tarea: tarea
      }
    } 
    this.router.navigate(["pages/tarea"], params)
  }
  
}
