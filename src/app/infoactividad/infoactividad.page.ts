import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-infoactividad',
  templateUrl: './infoactividad.page.html',
  styleUrls: ['./infoactividad.page.scss'],
})
export class InfoactividadPage implements OnInit {

  id:any;
  actividad: any;

  constructor(private route: ActivatedRoute, private afDB: AngularFireDatabase) { 
  }

  ngOnInit() {

    let idActividad = this.route.snapshot.params['id'];

    if (idActividad) {
      this.getActividad(idActividad);
    }

  }

  getActividad(idActividad:string) {
    
    this.afDB.object("actividades/" + idActividad)
      .snapshotChanges().subscribe(res => {
        this.actividad = res.payload.val();
        //console.log(this.actividad);
      });

  }

  //de momento no hay usuarios

}
