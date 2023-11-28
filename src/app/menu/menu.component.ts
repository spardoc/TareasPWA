import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  pages = [
    {title: 'Tarea', path: 'pages/tarea'},
    {title: 'Lista de Tareas', path: 'pages/lista-tareas'}
  ]
}
