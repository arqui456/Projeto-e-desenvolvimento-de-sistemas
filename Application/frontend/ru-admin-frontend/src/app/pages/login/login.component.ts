import { Component, OnInit , EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/models/IUser';
import { UserService } from 'src/app/services/user.service';

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

  @Output() isUserOnline: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private snackBar: MatSnackBar) {
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
      email: ['', [Validators.required, Validators.email]],
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
    console.log("trying to login...");
    this.formLogin.setValue({email: this.userEmail, password: this.userPassword});
    if(this.formLogin.invalid) {
      return;
    }
    var user = this.formLogin.getRawValue() as IUser;
    this.userService.login(user).subscribe((response) => {
      if(!response.sucess){
        this.setUserStatus(false);
        this.snackBar.open("Falha na autenticação", "Usuário ou senha incorretos.", {
          duration: 3000
        });
      }
      this.setUserStatus(true);
    })
  }


}
