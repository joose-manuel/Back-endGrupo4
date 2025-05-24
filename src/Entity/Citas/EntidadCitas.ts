import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Citas") // Asegúrate de que el nombre de la tabla sea consistente
export class Citas {
    @PrimaryGeneratedColumn()
    id_cita: number | undefined;

    //foranea de usuario
    //foranea de mascota

    @Column("date") 
    citaFecha: Date | undefined;

    @Column("text")
    citaHora:  | undefined;

    @Column({ type: "boolean", default: true })
    citaEstado: boolean | undefined;

    @Column("text")
    citaObservacion: string | undefined

    @Column("text")
    citaMotivo: string | undefined

}