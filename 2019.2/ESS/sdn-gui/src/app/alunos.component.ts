import { Component } from '@angular/core';
import { Aluno } from '../../../common/aluno';
import { AlunoService } from './alunos.service';


@Component({
  selector: 'app-root',
  templateUrl: './html/alunos.component.html',
  styleUrls: ['./css/app.component.css']
})
export class AlunosComponent {

  aluno: Aluno = new Aluno();
  alunos: Aluno[] = [];
  cpfduplicado: boolean = false;

  constructor(private alunoService: AlunoService) { }

  cadastrarAluno(a: Aluno): void {
    this.alunoService.cadastrarAluno(a)
      .subscribe(
        ar => {
          if (ar) {
            this.alunos.push(ar);
            this.aluno = new Aluno();
          } else {
            this.cpfduplicado = true;
          }
        },
        msg => { alert(msg.message); }
      );
      this.atualizarListaDeAlunos();
  }

  ngOnInit() :void {
    this.atualizarListaDeAlunos();
  }

  atualizarListaDeAlunos(): void {
    this.alunoService.getAlunos()
      .subscribe(
        as => { this.alunos = as; },
        msg => { alert(msg.message); }
      );
  }
}
