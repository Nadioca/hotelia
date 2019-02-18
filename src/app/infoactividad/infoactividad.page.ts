import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-infoactividad',
  templateUrl: './infoactividad.page.html',
  styleUrls: ['./infoactividad.page.scss'],
})
export class InfoactividadPage implements OnInit {

  id: any;
  actividad: any;
  todo = {};
  total: any;


  constructor(private route: ActivatedRoute, private afDB: AngularFireDatabase, public alertController: AlertController) {
  }

  ngOnInit() {

    let idActividad = this.route.snapshot.params['id'];

    this.id = idActividad;
    if (idActividad) {
      this.getActividad(idActividad);
    }



  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Perfecto',
      //subHeader: 'Subtitle',
      message: 'Su reserva se ha realizado correctamente',
      buttons: ['OK']
    });

    await alert.present();
  }

  async getActividad(idActividad: string) {

    this.afDB.object("actividades/" + idActividad)
      .snapshotChanges().subscribe(res => {
        this.actividad = res.payload.val();
        //console.log(this.actividad);
      });

    this.total = this.actividad.precio;

  }

  //de momento voy a hacer que sea el usuario 1 por defecto siempre y que está en el hotel
  //ya sabemos el usuario y la actividad
  async reservarActividad() {

    console.log("reservando...");

    
    let num_personas = this.todo['num_personas'];
    this.total = num_personas * this.actividad.precio;

    var newPostKey = firebase.database().ref().child('reservas').push().key;

    console.log(num_personas);

    let post: any = {
      id_usuario: 1,
      id_actividad: this.id,
      num_personas: this.todo['num_personas'],
      precio_pagar: num_personas * this.actividad.precio,
    };

    console.log(post);

    this.afDB.object(`/reservas/`+ newPostKey ).update(post);
    
    this.presentAlert();

  }

  cambiarPrecio(cantidad: number) {

    let precio = this.actividad.precio;
    this.total = precio * cantidad;

    return this.total;
  }


}
