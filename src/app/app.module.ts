import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import { FooterComponent } from './components/footer/footer.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { PropuestasComponent } from './pages/propuestas/propuestas.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { QuejasComponent } from './pages/quejas/quejas.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { PerfilComponent } from './pages/perfil/perfil.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EventoModalComponent } from './modal-pages/parte-evento/evento-modal/evento-modal.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AgregarEventoComponent } from './modal-pages/parte-evento/agregar-evento/agregar-evento.component';
import { EditarEventoComponent } from './modal-pages/parte-evento/editar-evento/editar-evento.component';
import { AgregarQuejaComponent } from './modal-pages/parte-queja/agregar-queja/agregar-queja.component';
import { ReportarQuejaComponent } from './modal-pages/parte-queja/reportar-queja/reportar-queja.component';
import {MatRadioModule} from '@angular/material/radio';
import { ReportesQuejaComponent } from './pages/reportes-queja/reportes-queja.component';
import { AgregarPropuestaComponent } from './modal-pages/parte-propuesta/agregar-propuesta/agregar-propuesta.component';
import { EditarPropuestaComponent } from './modal-pages/parte-propuesta/editar-propuesta/editar-propuesta.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    EventosComponent,
    PropuestasComponent,
    ProyectosComponent,
    QuejasComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    EventoModalComponent,
    AgregarEventoComponent,
    EditarEventoComponent,
    AgregarQuejaComponent,
    ReportarQuejaComponent,
    ReportesQuejaComponent,
    AgregarPropuestaComponent,
    EditarPropuestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule, 
    MatDialogModule,
    MatPaginatorModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class EventoModalModule { }
