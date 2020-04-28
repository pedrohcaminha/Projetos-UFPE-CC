import { Component, OnInit } from '@angular/core';
// import { AlunosCriticos} from '../../../../sdn-server/Service/Alunos Criticos/AlunosCriticosService';
import { Aluno } from '../../../../common/aluno'; 

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  alunosCriticos: Aluno[];
  // alunosCriticosService = new AlunosCriticos();
  ngOnInit() {
    // this.alunosCriticos.push(this.alunosCriticosService.alunosCriticos());
  }

}