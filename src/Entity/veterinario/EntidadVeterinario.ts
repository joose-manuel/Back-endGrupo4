import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Veterinarios") // Asegúrate de que el nombre de la tabla sea consistente
export class Veterinarios {
//foranea de usuario

    @Column("date") // Cambiar de "text" a "varchar" para evitar problemas
    inicioContrato: Date | undefined;

    @Column("date") // Cambiar de "text" a "varchar" para evitar problemas
    finContrato: Date | undefined;

    @Column("text")
    Especializacion: string | undefined

    @Column({ type: "boolean", default: true })
    estado: boolean | undefined;
}