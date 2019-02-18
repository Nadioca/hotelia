import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  constructor(private afDB: AngularFireDatabase) {
    this.getActividades();
  }
  
  actividades: any;

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

  ngOnInit() {
  }

}
