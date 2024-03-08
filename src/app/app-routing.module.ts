import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { PropuestasComponent } from './pages/propuestas/propuestas.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { QuejasComponent } from './pages/quejas/quejas.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReportesQuejaComponent } from './pages/reportes-queja/reportes-queja.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'propuestas', component: PropuestasComponent },
  { path: 'proyectos', component: ProyectosComponent},
  { path: 'quejas', component: QuejasComponent},
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'reportes-queja', component: ReportesQuejaComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
