import { Injectable } from '@angular/core';
import { environment }  from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private http:HttpClient) { }

  public listarMarcas(){
    return this.http.get(`${environment.url}/encuesta/marca/`);
  }

  public listarEncuestas(){
    return this.http.get(`${environment.url}/encuesta/`);
  }

  public agregarEncuesta(encuesta:any){
    return this.http.post(`${environment.url}/encuesta/`,encuesta);
  }

  public eliminarEncuesta(Id:any){
    return this.http.delete(`${environment.url}/encuesta/${Id}`);
  }
}
