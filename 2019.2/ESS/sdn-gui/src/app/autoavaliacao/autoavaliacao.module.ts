import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { AutoavaliacaoComponent } from './autoavaliacao.component';
import { PageComponent } from './page/page.component';
import { MatriculaService } from '../services/matricula.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    AutoavaliacaoComponent,
    PageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [LoginComponent, AutoavaliacaoComponent, PageComponent],
  providers: [MatriculaService],
})
export class AutoavaliacaoModule { }
