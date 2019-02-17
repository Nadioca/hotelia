import { Component } from '@angular/core';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  faCoffee = faCoffee;

  // tasks: Observable<any[]>;
  portada: any;
  actividades: any;

  constructor(private afDB: AngularFireDatabase) {
    //this.tasks = afDB.list('tasks').valueChanges();
    this.getPortada();
    this.getActividades();
  }

  getPortada() {
        this.afDB.list('portada').snapshotChanges().subscribe(items => {
          this.portada = items.map(a => {
            const data = a.payload.val();
            //const id = a.payload.key;
            return {  ...data };
          });
          console.log(this.portada);
        });
  }

  getActividades(){
    this.afDB.list('actividades').snapshotChanges().subscribe(items => {
      this.actividades = items.map(a => {
        const data = a.payload.val();
        const id = a.payload.key;
        return {  id, ...data };
      });
      console.log(this.actividades);
    });
  }

}
