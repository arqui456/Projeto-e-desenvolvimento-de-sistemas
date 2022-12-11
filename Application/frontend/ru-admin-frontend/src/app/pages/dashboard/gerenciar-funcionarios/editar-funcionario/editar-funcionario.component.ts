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
    funcionario_id: '1',
    nome:"alguém",
    cpf:"12312312312",
    email:"algo1231312@gmail.com",
    senha:"alguma senha"
  }
  constructor(private funcionariosService:FuncionariosService , private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    //const id = this.route.snapshot.paramMap.get('id')
    let id = null
    if(id!=null){
      // this.funcionariosService.readById(id).subscribe(funcionario=>{
      //   this.funcionario = funcionario
      // })
    }
    else{
      //this.router.navigate(['dashboard/gerenciar-funcionarios'])
    }
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
