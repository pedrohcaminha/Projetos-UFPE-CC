import  { Aluno } from './aluno'; 
import { Avaliacao } from './avaliacao';

export class Matricula {
    aluno: Aluno;
    avaliacoes: Array<Avaliacao>;
    media: number;
    autoAvaliacoes: Array<Avaliacao>;

    constructor(){
        this.avaliacoes = [];
        this.autoAvaliacoes = [];
        this.aluno = new Aluno();
        this.media = 0;
    }

    setAluno(aluno: Aluno){
        this.aluno.copyFrom(aluno);
    }

    adicionarAvaliacao(avaliacao: Avaliacao): void {
        this.avaliacoes.push(avaliacao);
    }
    adicionarAutoavaliacao(autoAvaliacao: Avaliacao): void {
        this.autoAvaliacoes.push(autoAvaliacao);
    }

    copyFrom(matricula: Matricula){
        this.aluno.copyFrom(matricula.aluno);
        this.avaliacoes = this.copyAvaliacoes(matricula.avaliacoes);
        this.autoAvaliacoes = this.copyAvaliacoes(matricula.autoAvaliacoes);
    }

    copyAvaliacoes(from: Array<Avaliacao>) : Array<Avaliacao>{
        var result: Array<Avaliacao> = [];
        for (var index in from){
            result.push(new Avaliacao(from[index].meta, from[index].conceito));
        }
        return result;
    }

    // calculo de media

    calcularMedia () : number {
        for (let a in this.avaliacoes) {
            if (a == "MANA") {
                return this.mediaPosMANA();
            } else {
                if (a == "MA") {
                    this.media = this.media + 1;
                } else if (a == "MPA") {
                    this.media = this.media + 0.6;
                } 
            }
        }
        return this.media;
    }

    mediaPosMANA () : number {
        for (let a in this.avaliacoes) {
            if (a == "MA") {
                this.media = this.media + (6.9/9);
            } else if (a == "MPA") {
                this.media = this.media + 0.5;
            }
        }
        return this.media;
    }
}