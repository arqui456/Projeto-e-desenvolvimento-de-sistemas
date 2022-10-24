import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-container-conteudo',
  templateUrl: './container-conteudo.component.html',
  styleUrls: ['./container-conteudo.component.scss']
})
export class ContainerConteudoComponent implements OnInit {
  @Input() loading = false;
  @Input() class = 'controle-padding';
  @Input() allViewHeight: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
