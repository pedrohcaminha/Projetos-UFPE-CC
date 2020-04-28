import { Aluno } from '../common/aluno';

export class CadastroDeAlunos {
    alunos: Aluno[] = [];

    cadastrar(aluno: Aluno): Aluno {
        let cadastrado = null;
        if (this.cpfNaoCadastrado(aluno.cpf) == true) {
            cadastrado = new Aluno();
            cadastrado.copyFrom(aluno);
            this.alunos.push(cadastrado);
        }
        return cadastrado;
    }

    cpfNaoCadastrado(cpf: string): boolean {
        return !this.alunos.find(a => a.cpf == cpf);
    }

    atualizar(aluno: Aluno): Aluno {
        let atualizado: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
        if (atualizado != null) {
            atualizado.copyFrom(aluno);
        }
        return atualizado;
    }

    getAlunos(): Aluno[] {
        return this.alunos;
    }

    getAlunoPorCPF(cpf: string): Aluno {
        return this.alunos.find(a => a.cpf == cpf);
    }
}
