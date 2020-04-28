import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlunosComponent } from './alunos.component';
import { AlunoService } from './alunos.service';

const appRoutes: Routes = [
];

@NgModule({
  declarations: [
    AlunosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  exports: [AlunosComponent],
  providers: [AlunoService]
})
export class AlunosModule { }
