import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFuncionario } from 'src/app/models/IFuncionario';
import { FuncionariosService } from 'src/app/services/funcionarios.service';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.scss'],
})
export class EditarFuncionarioComponent implements OnInit {
  funcionario: IFuncionario = {
    usuario_id: '1',
    nome: 'alguém',
    username: '',
    senha: 'alguma senha',
  };
  senhaRepetida: string = '';
  hide: boolean = true;
  constructor(
    private funcionariosService: FuncionariosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.funcionario = this.funcionariosService.getFuncionario();
  }
  editarFuncionario(): void {
    if(this.funcionario.nome.length > 1 && this.funcionario.username.length > 1 && this.funcionario.senha.length > 1 && this.senhaRepetida.length > 1){
      if(this.funcionario.senha.length > 7 && this.senhaRepetida.length > 7){
        if(this.funcionario.senha === this.senhaRepetida){
          this.funcionariosService.update(this.funcionario).subscribe(() => {
            this.funcionariosService.showMessage('Funcionário atualizado com sucesso');
            this.router.navigate(['dashboard/gerenciar-funcionarios']);
          });
        }else{
          this.funcionariosService.showMessage('Erro: As senhas não estão iguais.',true,'center','bottom' );
        }
      }else{
        this.funcionariosService.showMessage('Erro: As senhas devem ter no mínimo 8 caracteres.',true,'center','bottom' );
      }
    }else{
      this.funcionariosService.showMessage('Erro: Preencha todos os campos corretamente.',true,'center','bottom' );
    }
    
  }
  cancel() {
    this.router.navigate(['dashboard/gerenciar-funcionarios']);
  }
}
