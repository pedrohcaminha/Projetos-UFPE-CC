import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Relatorio } from './relatorio/relatorio';

@Component({
  selector: 'app-root',
  templateUrl: 'html/relatorio.component.html',
  styleUrls: ['css/relatorio.component.css']
})

export class RelatorioComponent {
  relatorio: Relatorio;
  resultado_relatorio : object;

  gerarRelatorio() {
    this.relatorio= new Relatorio(0);
    this.resultado_relatorio = this.relatorio.gerarRelatorio();
  }

  ngOnInit():void {
    this.gerarRelatorio();
  }
}
