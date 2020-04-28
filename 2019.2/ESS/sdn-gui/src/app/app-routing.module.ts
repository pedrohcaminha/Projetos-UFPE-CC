import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos.component';
import { AutoavaliacaoComponent } from './autoavaliacao/autoavaliacao.component';
import { LoginComponent } from './autoavaliacao/login/login.component';
import { PageComponent } from './autoavaliacao/page/page.component';


const routes: Routes = [
  {path: 'alunos', component: AlunosComponent},
  {path: 'autoavaliacao', component: AutoavaliacaoComponent},
  {path: 'autoavaliacao/login', component: LoginComponent},
  {path: 'autoavaliacao/page', component: PageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
