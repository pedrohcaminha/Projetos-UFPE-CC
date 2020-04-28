import { Matricula } from '../common/matricula';

export class CadastroDeMatricula {
  matriculas: Matricula[] = [];

  cadastrar(matricula: Matricula): Matricula {
    var result = null;
    if (this.matriculaNaoCadastrada(matricula.aluno.cpf)) {
      result = new Matricula();
      result.copyFrom(matricula);
      this.matriculas.push(result);
    }
    return result;
  }

  matriculaNaoCadastrada(cpf: string): boolean {
    return !this.matriculas.find(elem => elem.aluno.cpf == cpf);
  }

  atualizar(matricula: Matricula): Matricula {
    var result: Matricula = this.matriculas.find(m => m.aluno.cpf == matricula.aluno.cpf);

    if (result) {
      result.copyFrom(matricula);
    }
    return result;
  }

  deletar() {

  }

  getMatriculas(): Matricula[] {
    return this.matriculas;
  }
}