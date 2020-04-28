import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatriculaService } from '../../services/matricula.service';
import { Matricula } from '../../../../../common/matricula';
import { Avaliacao } from '../../../../../common/avaliacao';

@Component({
   selector: 'autoavaliacao-page',
   templateUrl: './page.component.html'
   //  styleUrls: ['./autoavaliacao-page.component.css'] 
})


export class PageComponent implements OnInit {
   constructor(private router: ActivatedRoute, private matriculaService: MatriculaService) { }

   matricula: Matricula;
   teste_nome: string;
   teste_cpf: string;
   campoNulo: boolean = false;
   display = "block";

   registrarConceitos() {
      if (!this.existeCampoNulo()){
         this.matriculaService.atualizar(this.matricula).subscribe(
            () => {
               document.location.reload(true);
            });
      }else{
         this.campoNulo = true;
      }
   }

   existeCampoNulo(): boolean{
      for (var index in this.matricula.autoAvaliacoes){
         if (this.matricula.autoAvaliacoes[index].conceito == "-"){
            this.campoNulo = true;
            return true;
         }
      }
      return false;
   }
   onMove(){
      this.campoNulo = false;
   }
   findIndex(meta: string) {
      return this.matricula.autoAvaliacoes.
         indexOf(this.matricula.autoAvaliacoes.find(elem => elem.meta == meta));
   }

   criar() {
      var matricula = new Matricula();
      matricula.aluno.nome = this.teste_nome;
      matricula.aluno.cpf = this.teste_cpf;
      matricula.aluno.email = "@cin";
      matricula.avaliacoes.push(new Avaliacao("Requisitos", "MPA"));
      matricula.avaliacoes.push(new Avaliacao("GerenciaDeConfiguracao", "MPA"));
      matricula.autoAvaliacoes.push(new Avaliacao("Requisitos", ""));
      matricula.autoAvaliacoes.push(new Avaliacao("GerenciaDeConfiguracao", ""));
      this.matriculaService.criar(matricula).subscribe(m => console.log(m));
   }

   ngOnInit(): void {
      this.matriculaService.getMatriculas().subscribe(ms => {
         this.matricula = ms.find(elem => elem.aluno.cpf ==
            this.router.snapshot.queryParams['cpf']);
      });
   }
}
