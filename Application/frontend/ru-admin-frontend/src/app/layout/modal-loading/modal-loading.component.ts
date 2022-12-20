import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-loading.component.html',
  styleUrls: ['./modal-loading.component.scss']
})
export class ModalLoadingComponent implements OnInit {
  @ViewChild('myModal', { static: false }) modal: ElementRef = new ElementRef('');
  constructor() { }
  @Input() legenda = 'Carregando…';
  ngOnInit(): void {
  }

  modalAberto: boolean = false;
  modalFechado: boolean = true;

  abrir() {
    this.modalFechado = false;
    this.modalAberto = true;
  }

  fechar() {
    this.modalAberto = false;
    this.modalFechado = true;
  }

}
