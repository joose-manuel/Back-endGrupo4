import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../Usuario/Usuario/EntidadUser";

@Entity("mascota")
export class Mascota {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column("text")
    nombre: string | undefined;

    @Column("text")
    raza: string | undefined;

    @Column("text")
    edad: string | undefined;

    @Column("text")
    peso: string | undefined;

    @Column("text")
    vacunas: string | undefined;

    // Relación con User: Muchas mascotas pertenecen a un usuario
    @ManyToOne(() => User, (user) => user.mascotas)
    user: User | undefined;
}