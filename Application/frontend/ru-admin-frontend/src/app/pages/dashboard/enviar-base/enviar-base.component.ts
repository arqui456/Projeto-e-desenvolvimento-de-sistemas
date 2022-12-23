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
    //console.log(this.fileToUpload == null ? "nenhum arquivo" : this.fileToUpload.name)
    if (this.fileToUpload != null) {
      this.databaseService.sendCsvDatabase(this.fileToUpload).subscribe((response)=>{
        console.log(response)
      })
      //let response = this.databaseService.sendCsvDatabase(this.fileToUpload);
      //console.log(response)
    } else {
      this.funcionariosService.showMessage('Erro: Envio inválido ou vazio.',true,'center','bottom' );
    }
  }
  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload != null) {

      this.fileName = this.fileToUpload.name;
      //console.log(this.fileToUpload.name)
      //console.log(this.fileToUpload)
    }
  }

}
