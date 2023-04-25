import { Component,OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/services/encuesta.service';
import  Swal  from 'sweetalert2';
@Component({
  selector: 'app-view-encuesta',
  templateUrl: './view-encuesta.component.html',
  styleUrls: ['./view-encuesta.component.scss']
})
export class ViewEncuestaComponent implements OnInit {

  encuesta : any = [];

  constructor(private encuestaService:EncuestaService) { }

  ngOnInit(): void {
    this.encuestaService.listarEncuestas().subscribe(
      (dato:any) => {
        this.encuesta = dato;
      },
      (error) => {
        Swal.fire('Error','Error al cargar las encuestas','error');
      }
    )
  }

  eliminar(id:any){
    Swal.fire({
      title:'Eliminar Encuesta',
      text:'¿Estás seguro de eliminar la Encuesta?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.encuestaService.eliminarEncuesta(id).subscribe(
          (data) => {
            this.encuesta = this.encuesta.filter((examen:any) => examen.id != id);
            Swal.fire('Encuesta eliminada','La Encuesta ha sido eliminado de la base de datos','success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar la Encuesta','error');
          }
        )
      }
    })
  }

}
