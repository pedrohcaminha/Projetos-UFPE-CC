import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatriculaService } from '../../services/matricula.service';
import { Matricula } from '../../../../../common/matricula';
import { Avaliacao } from '../../../../../common/avaliacao';

@Component({
  selector: 'sel',
  templateUrl: './login.component.html'
  // styleUrls: ['./autoavaliacao-login.component.css']
})


export class LoginComponent {
  constructor(private router: Router, private matriculaService: MatriculaService) { }

  cpf: string = "";
  cpfNaoExiste: boolean = false;
  teste_nome: string;
  teste_cpf: string;

  signIn(){
    this.matriculaService.getMatriculas().subscribe(
      ms => {
        if(ms.find(m => m.aluno.cpf == this.cpf)){
          this.router.navigate(['/autoavaliacao/page'], {queryParams: {cpf: this.cpf}});
        }else{
          this.cpfNaoExiste = true;
        }
      }
    );
  }

  onMove(){
    this.cpfNaoExiste = false;
  }

  criar(){
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
}
