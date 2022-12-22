import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFuncionario } from 'src/app/models/IFuncionario';
import { FuncionariosService } from 'src/app/services/funcionarios.service';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.scss']
})
export class EditarFuncionarioComponent implements OnInit {
  funcionario: IFuncionario = {
    usuario_id: '1',
    nome:"alguém",
    username:'',
    senha:"alguma senha"
  }
  senhaRepetida: string='';
  constructor(private funcionariosService:FuncionariosService , private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.funcionario = this.funcionariosService.getFuncionario()
  }
  editarFuncionario():void{
    this.funcionariosService.update(this.funcionario).subscribe(()=> {
      this.funcionariosService.showMessage('Produto atualizado com sucesso')
      this.router.navigate(['dashboard/gerenciar-funcionarios'])
    })
  }
  cancel(){
    this.router.navigate(['dashboard/gerenciar-funcionarios'])
  }
}
