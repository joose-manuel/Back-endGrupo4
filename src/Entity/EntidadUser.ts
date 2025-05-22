
//Importacion de TypeORM que va atraer todas la acotaciones o textos envevidos ejemplo: @Entity, @PrimaryGeneratedColumn, @Column
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//Colocamos la acotacion @Entity para que TypeORM reconozca la clase como una entidad de base de datos
@Entity("user")
//Definimos la clase User que representa la entidad de usuario
export class User{
    //Definimos la propiedad id como una columna primaria generada automáticamente
    //Esto significa que el valor de id se generará automáticamente al insertar un nuevo registro
    @PrimaryGeneratedColumn()
    id: number | undefined;
    //Definimos las propiedades de la entidad User
    //Estas propiedades se mapearán a columnas en la tabla de la base de datos
    @Column("text")
    nombre: string  | undefined;
    
    @Column("text")
    apellido: string | undefined;

    @Column("text")
    email: string | undefined;
}

