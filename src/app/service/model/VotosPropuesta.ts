import { Usuario } from "./Usuario";
import { Propuesta } from "./Propuesta";

export interface VotosPropuesta {
    id: number;
    propuesta: Propuesta;
    usuario: Usuario;
    voto: number;

}

