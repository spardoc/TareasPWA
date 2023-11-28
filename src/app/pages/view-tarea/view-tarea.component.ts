import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TareasFirebaseService } from 'src/app/services/tareas-firebase.service';
import { Tarea } from 'src/domain/tarea';

@Component({
  selector: 'app-view-tarea',
  templateUrl: './view-tarea.component.html',
  styleUrls: ['./view-tarea.component.scss']
})
export class ViewTareaComponent {

  listaTareas: any

  tarea :Tarea = new Tarea();
  
  constructor(private router:Router,
    private route: ActivatedRoute,
    private tareasFirebaseService: TareasFirebaseService)
    {
      this.listaTareas = this.tareasFirebaseService.getAll() //Obtenemos las tareas de nuestra base
      this.route.params.subscribe(params => 
        {
          console.log(params)
          if(params['uid'])
          {
            this.loadTarea(params['uid'])
          }
        })
    }

  goListado() // Para ir a el listado de tareas
  {
    console.log("Llamando lista de tareas")
    this.router.navigate(['pages/lista-tareas'])
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

  loadTarea(uid:string) { //Para obtener la informacion de la tarea que hicimos clic
    this.tareasFirebaseService.getTarea(uid).subscribe(data => 
      {
        console.log(data)
        this.tarea = <any> data
      })
  }

  eliminarTarea() // Metodo que se llama al momento de hacer click en el boton de guardar, para guardar la tarea en nuestra base.
  {
      this.tareasFirebaseService.deleteTarea(this.tarea)
      this.router.navigate(['pages/lista-tareas'])
  }
}
