import { Component,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EncuestaService } from 'src/app/services/encuesta.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-add-encuesta',
  templateUrl: './add-encuesta.component.html',
  styleUrls: ['./add-encuesta.component.scss']
})
export class AddEncuestaComponent implements OnInit {
  marcas:any = [];

  encuestaData = {
    numeroDocumento:'',
    email:'',
    comentarios:'',
    marcaFavoritaId:{
      id:''
    },
    fechaRespuesta: new Date()
  }

  constructor(
    private encuestaService:EncuestaService,
    private snack:MatSnackBar,
    private router:Router) { }

  ngOnInit(): void {
    this.encuestaService.listarMarcas().subscribe(
      (dato:any) => {
        this.marcas = dato;
      },(error) => {
        Swal.fire('Error !!','Error al cargar los datos','error');
      }
    )
  }

  guardarCuestionario(){
    this.validaciones();
    this.encuestaService.agregarEncuesta(this.encuestaData).subscribe(
      (data) => {

        Swal.fire('Examen guardado','La encuesta ha sido guardado con éxito','success');
        this.encuestaData = {
          numeroDocumento:'',
          email:'',
          comentarios:'',
          marcaFavoritaId:{
            id:''
          },
          fechaRespuesta: new Date()
        }
        this.router.navigate(['/admin/examenes']);
      },
      (error) => {
        Swal.fire('Error','Error al guardar la encuesta','error');
      }
    )
  }
  validaciones(){
    if(this.encuestaData.numeroDocumento.trim() == '' || this.encuestaData.numeroDocumento == null){
      this.snack.open('El numero documento es requerido','',{
        duration:3000
      });
      return ;
    }
    if(this.encuestaData.email.trim() == '' || this.encuestaData.email == null){
      this.snack.open('El email es requerido','',{
        duration:3000
      });
      return ;
    }
    if(this.encuestaData.marcaFavoritaId == null){
      this.snack.open('La marca es requerido','',{
        duration:3000
      });
      return ;
    }
    if(this.encuestaData.comentarios.trim() == '' || this.encuestaData.comentarios == null){
      this.snack.open('El comentario es requerido','',{
        duration:3000
      });
      return ;
    }

  }

}
