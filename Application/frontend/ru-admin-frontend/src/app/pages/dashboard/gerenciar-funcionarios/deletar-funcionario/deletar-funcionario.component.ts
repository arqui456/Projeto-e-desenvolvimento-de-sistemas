import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFuncionario } from 'src/app/models/IFuncionario';
import { FuncionariosService } from 'src/app/services/funcionarios.service';

@Component({
  selector: 'app-deletar-funcionario',
  templateUrl: './deletar-funcionario.component.html',
  styleUrls: ['./deletar-funcionario.component.scss']
})
export class DeletarFuncionarioComponent implements OnInit {
  funcionario: IFuncionario = {
    usuario_id: '1',
    nome:"alguém",
    username:'',
    senha:"alguma senha"
  }
  senhaRepetida: string='';
  hide: boolean = true;
  constructor(private funcionariosService:FuncionariosService , private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.funcionario = this.funcionariosService.getFuncionario()
  }
  deletarFuncionario():void{
    if(this.funcionario.usuario_id!=null){
      this.funcionariosService.delete(this.funcionario.usuario_id!.toString()).subscribe(()=> {
        this.funcionariosService.showMessage('Funcionário removido com sucesso');
        this.router.navigate(['dashboard/gerenciar-funcionarios']);
      })
    }
  }
  cancel(){
    this.router.navigate(['dashboard/gerenciar-funcionarios'])
  }
}
