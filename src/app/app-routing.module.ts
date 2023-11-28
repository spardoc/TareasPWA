import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTareasComponent } from './pages/lista-tareas/lista-tareas.component';
import { TareaComponent } from './pages/tarea/tarea.component';
import { ViewTareaComponent } from './pages/view-tarea/view-tarea.component';

const routes : Routes = [
  {path: "pages/tarea", component: TareaComponent},
  {path: "pages/lista-tareas", component: ListaTareasComponent},
  {path: "pages/tarea/:uid", component: ViewTareaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
