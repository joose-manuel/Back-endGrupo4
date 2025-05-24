import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Especie") // Asegúrate de que el nombre de la tabla sea consistente
export class Especies {
    @PrimaryGeneratedColumn()
    id_especie: number | undefined;

    @Column("varchar", { length: 255 }) // Cambiar de "text" a "varchar" para evitar problemas
    Especie_nombre: string | undefined;

    @Column("text")
    Esp_fechaCreacion: string | undefined;
}