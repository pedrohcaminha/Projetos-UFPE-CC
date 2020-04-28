import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunosModule } from './alunos.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RelatorioComponent} from './relatorio.component';
import { TurmasComponent } from './turmas.component';
import { AutoavaliacaoModule } from './autoavaliacao/autoavaliacao.module';

const appRoutes : Routes = [
  {path: 'relatorio', component: RelatorioComponent},
  {path: 'turmas', component: TurmasComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RelatorioComponent,
    TurmasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutoavaliacaoModule,
    FormsModule,
    AlunosModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
