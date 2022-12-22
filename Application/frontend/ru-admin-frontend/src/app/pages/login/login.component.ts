import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SidebarItem } from 'src/app/models/sidebar-item.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  userEmail = "";
  userPassword = "";
  online: boolean = false;
  sidebarItens:SidebarItem[] = [];
  @Output() isUserOnline: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private router: Router) {
                this.formLogin = formBuilder.group({
                  email: ['', [Validators.required, Validators.email]],
                  password: ['', [Validators.required]]
                  });
              }

  ngOnInit(): void {
    this.createForm();
  }

  emailHandler(formInput: string) {
    this.userEmail = formInput;
  }

  passwordHandler(formInput: string) {
    this.userPassword = formInput;
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
      });
  }

  setUserStatus(event: boolean) {
    if(this.online !==  event) {
      this.online = event;
      this.isUserOnline.emit(event);
    }
  }
  

  login(){
    this.formLogin.setValue({email: this.userEmail, password: this.userPassword});
    if(this.formLogin.invalid) {
      return;
    }
    var temp = this.formLogin.getRawValue();
    var credentials = { username: temp.email,
                        senha: temp.password };
    console.log("trying to login...");
    this.userService.login(credentials).subscribe((response) => {
      if(!response.auth){
        this.setUserStatus(false);
        this.snackBar.open("Falha na autenticação", "Usuário ou senha incorretos.", {
          duration: 3000
        });
      }
      this.userService.checkUserPrivilege().subscribe(value =>{
        this.sidebarItens = this.updateSidenav(value);
        this.setUserStatus(true);
        if(value) this.router.navigate(['dashboard/gerar-relatorio']);
        else this.router.navigate(['dashboard/consultar-usuario']);
        this.userService.setSidenavItens(this.sidebarItens);
      })
    })
  }

  private updateSidenav(isPrivileged:boolean):SidebarItem[]{
    if(isPrivileged){
      return [
        {titulo: 'Gerar Relatório', icone: 'insert_drive_file', linkTo: 'dashboard/gerar-relatorio'},
        {titulo: 'Gerenciar Funcionários', icone: 'people', linkTo: 'dashboard/gerenciar-funcionarios'}, 
        {titulo: 'Enviar Base de Dados', icone: 'cloud_upload', linkTo: 'dashboard/enviar-base'},
      ];
    }
    else{
      return [
        {titulo: 'Consultar Usuário', icone: 'search', linkTo: 'dashboard/consultar-usuario'},
      ];
    }
  }

}
