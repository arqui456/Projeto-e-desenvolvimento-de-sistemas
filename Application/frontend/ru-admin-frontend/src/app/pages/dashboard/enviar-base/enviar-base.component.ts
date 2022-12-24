import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from 'src/app/services/funcionarios.service';

@Component({
  selector: 'app-enviar-base',
  templateUrl: './enviar-base.component.html',
  styleUrls: ['./enviar-base.component.scss']
})
export class EnviarBaseComponent implements OnInit {
  fileName: string
  fileToUpload: File | null = null;
  constructor(private databaseService: DatabaseService, private funcionariosService:FuncionariosService) {
    this.fileName = ''
  }

  ngOnInit(): void {
  }

  sendDataBase() {
    if (this.fileToUpload != null) {
      this.databaseService.sendCsvDatabase(this.fileToUpload).subscribe((response)=>{
        if(response['couldNotUpdate'].length <= 0){
          this.funcionariosService.showMessage('Base atualizada com sucesso',false,'center','bottom' );
        }
        else{
          this.funcionariosService.showMessage(`Linha do cpf ${response['couldNotUpdate'][0]['cpf']} com erro`,true,'center','bottom' );
        }
      })
    } else {
      this.funcionariosService.showMessage('Erro: Envio inválido ou vazio.',true,'center','bottom' );
    }
  }
  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload != null) {

      this.fileName = this.fileToUpload.name;
    }
  }

}
