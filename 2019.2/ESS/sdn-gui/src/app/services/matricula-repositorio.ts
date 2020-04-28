import { Matricula } from '../../../../common/matricula';
import { Aluno } from '../../../../common/aluno';
import { Avaliacao } from '../../../../common/avaliacao';
 
export class MatriculaRepositorio {
    matriculas: Matricula[] = [];

    constructor(){
        this.init();
    }

    init(){
        //populando matriculas
        var m1 = new Matricula();
        var aluno1 = new Aluno();
        aluno1.setNome('Thiago');
        aluno1.setCPF('123');
        aluno1.setEmail('@cin');
        m1.aluno.copyFrom(aluno1);
        var a1 = new Avaliacao("Requisitos", "MPA");
        var a2 = new Avaliacao("Requisitos", "");
        var a3 = new Avaliacao("GerenciaDeConfiguracao", "MANA");
        var a4 = new Avaliacao("GerenciaDeConfiguracao", "");
        m1.adicionarAvaliacao(a1);
        m1.adicionarAutoavaliacao(a2);
        m1.adicionarAvaliacao(a3);
        m1.adicionarAutoavaliacao(a4);


        var m2 = new Matricula();
        var aluno2 = new Aluno();
        aluno2.setNome('Sicrano');
        aluno2.setCPF('456');
        aluno2.setEmail('@cin');
        m2.aluno.copyFrom(aluno2);

        var b1 = new Avaliacao("Requisitos", "MA");
        var b2 = new Avaliacao("Requisitos", "");
        var b3 = new Avaliacao("GerenciaDeConfiguracao", "MA");
        var b4 = new Avaliacao("GerenciaDeConfiguracao", "");
        
        m2.adicionarAvaliacao(b1);
        m2.adicionarAutoavaliacao(b2);
        m2.adicionarAvaliacao(b3);
        m2.adicionarAutoavaliacao(b4);
        
        
        var m3 = new Matricula();
        var aluno3 = new Aluno();
        aluno3.setNome('Beltrano');
        aluno3.setCPF('789');
        aluno3.setEmail('@cin');
        m3.aluno.copyFrom(aluno3);

        var c1 = new Avaliacao("GerenciaDeConfiguracao", "MANA");
        var c2 = new Avaliacao("GerenciaDeConfiguracao", "");
        var c3 = new Avaliacao("Requisitos", "MPA");
        var c4 = new Avaliacao("Requisitos", "");
        
        m3.adicionarAvaliacao(c1);
        m3.adicionarAutoavaliacao(c2);
        m3.adicionarAvaliacao(c3);
        m3.adicionarAutoavaliacao(c4);

        this.matriculas.push(m1);
        this.matriculas.push(m2);
        this.matriculas.push(m3);
    }

    getMatriculas(){
        return this.matriculas;
    }
}