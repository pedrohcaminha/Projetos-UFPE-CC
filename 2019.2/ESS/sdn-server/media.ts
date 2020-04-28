
export class Media {

    media : any;
    //matricula : any;


    constructor () {
        this.media = 0;
        //this.matricula = ["MA", "MPA", "MANA", "MA", "MPA", "MPA", "MPA", "MA", "MPA", "MANA"]
    }

    calcularMedia(avaliacao: any) : any {
        for (let a in avaliacao) {
            if (a == "MANA") {
                return this.mediaPosMANA(avaliacao);
            } else {
                if (a == "MA") {
                    this.media += 1;
                } else if (a == "MPA") {
                    this.media += 0.6;
                }
            }
        }
        return this.media;  
    }

    mediaPosMANA(avaliacao: any) : any {
        this.media = 0;
        for (let a in avaliacao) {
            if (a == "MA") {
                this.media += (6.9/9);
            } else if (a == "MPA") {
                this.media += 0.5;
            }
        }
    }

}