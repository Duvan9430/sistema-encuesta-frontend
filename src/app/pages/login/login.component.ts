import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  loginData = {
    "username" : '',
    "password" : '',
  }

  constructor(private snack:MatSnackBar,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      this.snack.open('La contraseña es requerida !!','Aceptar',{
        duration:3000
      })
      return;
    }
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          this.loginService.setUser(user);

          if(this.loginService.getUser() != null){
            this.router.navigate(['/admin']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else{
            this.loginService.logout();
          }
        })
      },(error:any) => {
        this.snack.open('Detalles inválidos , '+ error.error.message +'','Aceptar',{
          duration:3000
        })
      }
    )
  }
  cambiarEstadoUsuario(data:any){
    this.loginService.setEstadoUser(data).subscribe(
      (data:any) => {
        if(data.bloqueo >= 3){
          this.snack.open('Intentos registro Usuario , '+ data.bloqueo +'','Aceptar',{
            duration:3000
          })
        }

      },(error:any) => {

        this.snack.open('Detalles inválidos , '+ error.error.message +'','Aceptar',{
          duration:3000
        })
      }
    )
  }
}
