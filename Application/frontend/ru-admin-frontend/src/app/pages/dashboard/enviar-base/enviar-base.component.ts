import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enviar-base',
  templateUrl: './enviar-base.component.html',
  styleUrls: ['./enviar-base.component.scss']
})
export class EnviarBaseComponent implements OnInit {
  fileName:string
  fileToUpload: File | null = null;
  constructor(private databaseService:DatabaseService) {
    this.fileName = ''
  }

  ngOnInit(): void {
  }

  sendDataBase(){
    console.log(this.fileToUpload == null? "nenhum arquivo":this.fileToUpload.name)
    if(this.fileToUpload != null){
      this.databaseService.sendCsvDatabase(this.fileToUpload);
      //chamar o service e enviar o arquivo
    }
  }
  onFileSelected(event:any) {
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload != null) {

        this.fileName = this.fileToUpload.name;
        console.log(this.fileToUpload.name)
        console.log(this.fileToUpload)

        //const formData = new FormData();

        //formData.append("thumbnail", file);

        //const upload$ = this.http.post("/api/thumbnail-upload", formData);

        //upload$.subscribe();
    }
}

}
