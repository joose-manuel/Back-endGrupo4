import { DataSource } from "typeorm";
import { User } from './Entity/Usuario/EntidadUser';
import { Mascota } from "./Entity/mascotas/EntidadMascota";
import { Especies } from "./Entity/especies/EntidadEspecie";
import { Veterinarios } from "./Entity/veterinario/EntidadVeterinario";
import { Citas } from "./Entity/Citas/EntidadCitas";
import { Roles } from "./Entity/Roles/EntidadRoles";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "a1234",
    database: "verterinaria2",
    synchronize: false,
    logging: true,
    entities: [User, Mascota,Especies,Veterinarios,Citas,Roles],
    subscribers: [],
    migrations: [],
    //ymjk xlpe eidf euke
})