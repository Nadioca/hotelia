import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

//voy a hacer que coja siempre el 1 para no tener login

export class PerfilPage implements OnInit {

  id_usuario: any;
  usuario: any;

  constructor( private route: ActivatedRoute, private afDB: AngularFireDatabase ) { 

    this.id_usuario = 1;

    if (this.id_usuario != "") {
      this.getActividad(this.id_usuario);
    }

  }

  async getActividad(usuario: string) {

    this.afDB.object("clientes/" + usuario)
      .snapshotChanges().subscribe(res => {
        this.usuario = res.payload.val();
        //console.log(this.actividad);
      });

  }

  ngOnInit() {
  }

}
