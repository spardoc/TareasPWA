import { Component, OnInit } from '@angular/core';
import { TareasFirebaseService } from 'src/app/services/tareas-firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private tareasFirebaseService: TareasFirebaseService) {}

  ngOnInit() {
    window.addEventListener('online', () => {
      this.tareasFirebaseService.subirTareasPendientes();
    });
  }
}