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
    funcionario_id: '1',
    nome:"alguém",
    cpf:"12312312312",
    email:"algo1231312@gmail.com",
    senha:"alguma senha"
  }
  constructor(private funcionariosService:FuncionariosService , private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = 1
    //const id = this.route.snapshot.paramMap.get('id')
    if(id!=null){
      this.router.navigate(['dashboard/gerenciar-funcionarios/deletar/1'])
      // this.funcionariosService.readById(id).subscribe(funcionario=>{
      //   this.funcionario = funcionario
      // })
    }
    else{
      this.router.navigate(['dashboard/gerenciar-funcionarios'])
    }
  }
  deletarFuncionario():void{
    if(this.funcionario.funcionario_id!=null){
      this.funcionariosService.delete(this.funcionario.funcionario_id!.toString()).subscribe(()=> {
        this.funcionariosService.showMessage('Produto removido com sucesso')
        this.router.navigate(['dashboard/gerenciar-funcionarios'])
      })
    }
  }
  cancel(){
    this.router.navigate(['dashboard/gerenciar-funcionarios'])
  }
}
