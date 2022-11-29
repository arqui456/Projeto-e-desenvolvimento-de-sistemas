import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enviar-base',
  templateUrl: './enviar-base.component.html',
  styleUrls: ['./enviar-base.component.scss']
})
export class EnviarBaseComponent implements OnInit {
  fileName:string
  fileToUpload: File | null = null;
  constructor() {
    this.fileName = ''
   }

  ngOnInit(): void {
  }

  sendDataBase(){
    console.log(this.fileToUpload == null? "nenhum arquivo":this.fileToUpload.name)
  }
  onFileSelected(event:any) {
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload != null) {

        this.fileName = this.fileToUpload.name;

        //const formData = new FormData();

        //formData.append("thumbnail", file);

        //const upload$ = this.http.post("/api/thumbnail-upload", formData);

        //upload$.subscribe();
    }
}

}
