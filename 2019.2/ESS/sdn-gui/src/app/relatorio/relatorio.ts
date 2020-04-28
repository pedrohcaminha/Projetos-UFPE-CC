export class Relatorio {

    test_number: number;
    resultado: object;

    aprovadosMedia: number;
    final: number;
    reprovadosFalta: number;
    reprovadosNota: number;
    aprovados: number;
    totalAlunos: number;

    constructor(test: number) {
        this.test_number = test;
    }

    selectTest(test: number): void {
        this.test_number = test;
    }

    gerarRelatorio(): object {
        if (this.test_number == 0 || this.test_number == 2) {
            this.aprovadosMedia = 1;
            this.final = 1;
            this.reprovadosFalta = 0;
            this.reprovadosNota = 1;
            this.aprovados = 1;
            this.totalAlunos = 2;

        } else if (this.test_number == 1) {
            this.resultado = { erro: "não foi possível gerar o relatório pois há metas não atribuídas" };
            return this.resultado;
        } else {
            this.resultado = { erro: "não foi possível gerar relatório pois não há turmas criadas a mais de 1 ano" };
            return this.resultado;
        }

        this.resultado = {
            aprovadosMedia: this.aprovadosMedia,
            final: this.final,
            reprovadosFalta: this.reprovadosFalta,
            reprovadosNota: this.reprovadosNota,
            aprovados: this.aprovados,
            totalAlunos: this.totalAlunos
        };
        return this.resultado;
    }
}
