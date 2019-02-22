import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'actividades',
   loadChildren: './actividades/actividades.module#ActividadesPageModule' },
  { path: 'infoactividad/:id', loadChildren: './infoactividad/infoactividad.module#InfoactividadPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'lista-incidencias', loadChildren: './lista-incidencias/lista-incidencias.module#ListaIncidenciasPageModule' },
  { path: 'crear-incidencia', loadChildren: './crear-incidencia/crear-incidencia.module#CrearIncidenciaPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
