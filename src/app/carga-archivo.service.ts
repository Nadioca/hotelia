import { Injectable } from '@angular/core';

import { Toast } from '@ionic-native/toast/ngx';

import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CargaArchivoService {

  imagenes: ArchivoSubir[] = [];
  lastKey: string = null;


  constructor(public toastCtrl: Toast,
    public afDB: AngularFireDatabase) {

    this.cargar_ultimo_key();

  }

  private cargar_ultimo_key() {

    return this.afDB.list('incidencias', ref => ref.orderByKey().limitToLast(1)).valueChanges().subscribe(res => {
      map((post: any) => {

        console.log(post);
        this.lastKey = post[0].key;

        this.imagenes.push(post[0]);

      });
    });

  }


  cargar_imagenes() {

    return new Promise((resolve, reject) => {

      this.afDB.list('incidencias',
        ref => ref.limitToLast(3)
          .orderByKey()
          .endAt(this.lastKey)
      ).valueChanges()
        .subscribe((posts: any) => {

          posts.pop();

          if (posts.length == 0) {
            console.log('Ya no hay más registros');
            resolve(false);
            return;
          }

          this.lastKey = posts[0].key;

          for (let i = posts.length - 1; i >= 0; i--) {
            let post = posts[i];
            this.imagenes.push(post);
          }

          resolve(true);

        });



    });

  }


  cargar_imagen_firebase(archivo: ArchivoSubir) {

    let promesa = new Promise((resolve, reject) => {


      let storeRef = firebase.storage().ref();
      let nombreArchivo: string = new Date().valueOf().toString(); // 1231231231

      let uploadTask: firebase.storage.UploadTask =
        storeRef.child(`img/${nombreArchivo}`)
          .putString(archivo.img, 'base64', { contentType: 'image/jpeg' });

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => { }, // saber el % de cuantos Mbs se han subido
        (error) => {
          // manejo de error
          console.log("ERROR EN LA CARGA");
          console.log(JSON.stringify(error));
          reject();
        },
        () => {
          // TODO BIEN!!
          console.log('Archivo subido');

          let url = uploadTask.snapshot.downloadURL;

          this.crear_post(archivo.titulo, url, nombreArchivo);

          resolve();
        }

      )

    });

    return promesa;

  }


  private crear_post(titulo: string, url: string, nombreArchivo: string) {

    var newPostKey = firebase.database().ref().child('incidencias').push().key;

    let post: ArchivoSubir = {
      img: url,
      titulo: titulo,
      key: nombreArchivo
    };

    console.log(JSON.stringify(post));

    // this.afDB.list('/post').push(post)
    this.afDB.object(`incidencias/${newPostKey}`).update(post);

    this.imagenes.push(post);

  }

}

interface ArchivoSubir {
  titulo: string;
  img: string;
  key?: string;
}
