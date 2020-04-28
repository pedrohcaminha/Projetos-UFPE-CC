import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './html/turmas.component.html',
    styleUrls: ['./css/app.component.css']
})
export class TurmasComponent {
    showESS20192: boolean;
    showESS20191: boolean;

    showClass1() {
        if (this.showESS20192 == true) {
            this.showESS20192 = false;
        } else {
            this.showESS20192 = true;
        }
    }

    showClass2() {
        if (this.showESS20191 == true) {
            this.showESS20191 = false;
        } else {
            this.showESS20191 = true;
        }
    }
}
