import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity("Roles")
export class Roles {
    @PrimaryGeneratedColumn()
    id_rol: number | undefined;

    @Column("text")
    rolNombre: string | undefined;

    @Column("date")
    rolFechaCambio: string | undefined;

    
}

