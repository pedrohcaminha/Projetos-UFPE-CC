export class Avaliacao {
    meta: string;
    conceito: string;
  
    constructor(meta: string, conceito: string) {
       this.meta = meta;
       this.conceito = conceito;
    }

    atualizaMeta(meta: string) : void{
        this.meta = meta;
    }
    atualizaConceito(conceito: string): void{
        this.conceito = conceito;
    }
  }