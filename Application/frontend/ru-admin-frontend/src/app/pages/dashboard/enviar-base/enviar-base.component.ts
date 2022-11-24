import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enviar-base',
  templateUrl: './enviar-base.component.html',
  styleUrls: ['./enviar-base.component.scss']
})
export class EnviarBaseComponent implements OnInit {
  archive:any
  constructor() { }

  ngOnInit(): void {
  }

  enviarBase(){
    console.log('funcionou')
  }
  setarBase(archive:any){
    this.archive = archive
    
    console.log(archive)
  }
  doFileInput(){
    console.log('funcionou 2')
  }

}
