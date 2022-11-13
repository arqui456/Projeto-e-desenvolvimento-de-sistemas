import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryClientService } from 'src/app/services/query-client.service';

@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.scss']
})
export class ConsultaUsuarioComponent implements OnInit {

  validatedUsed: boolean = false;
  cpfValue: string = "";

  constructor(private router: Router, private clientService: QueryClientService) { }

  ngOnInit(): void {
    this.validatedUsed = false;
  }

  cpfHandler(cpf: string) {
    this.cpfValue = cpf;
  }

  queryUserEvent() {
    this.validatedUsed = true;
    console.log(this.validatedUsed);
    this.clientService.queryClient({ cpf: this.cpfValue})
      .subscribe(data => {
        console.log(data);
    });

    if(this.validatedUsed) {
      
    }
  }

}
