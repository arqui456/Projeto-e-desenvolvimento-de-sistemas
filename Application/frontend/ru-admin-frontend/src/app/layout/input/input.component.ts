import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  @Input() placeholder: string = '';
  @Input() mostraErro: boolean = false;
  @Input() msgErro: string = 'Campo obrigatório!';
  @Input() tipoEntrada: string = 'text';
  @Input() tamanhoMaximo: number = 40;
  @Input() isDisabled: boolean = true;
  @Input() id: string = '';
  @Input() loading: boolean = false;
  @Input() overflowEllipsis: boolean = false;
  @Input() inputSize: 'sm' | 'md' | 'lg' = 'sm';

  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();

  onChangeHistory: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onChangeValue(event: string): void {
    if(this.onChangeHistory !== event) {
      this.onChangeHistory = event;
      this.inputValueChange.emit(event)
    }
  }

}
