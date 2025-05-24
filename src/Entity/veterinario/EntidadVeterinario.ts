import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from "../Usuario/EntidadUser";

@Entity("Veterinarios") // Asegúrate de que el nombre de la tabla sea consistente
export class Veterinarios {
//foranea de usuario
    @PrimaryGeneratedColumn() // Clave primaria
    id_: number | undefined;


    @Column("date") // Cambiar de "text" a "varchar" para evitar problemas
    inicioContrato: Date | undefined;

    @Column("date") // Cambiar de "text" a "varchar" para evitar problemas
    finContrato: Date | undefined;

    @Column("text")
    Especializacion: string | undefined

    @Column({ type: "boolean", default: true })
    estado: boolean | undefined;

    // Relación muchos a muchos con Usuarios
    @ManyToMany(() => User, (user) => user.veterinarios)
    usuarios: User[] | undefined;
}