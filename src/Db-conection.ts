import { DataSource } from "typeorm";
import { User } from "./Entity/Usuario/Usuario/EntidadUser";
import { Mascota } from "./Entity/mascota/EntidadMascota";
import { Especies } from "./Entity/especies/EntidadEspecie";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "a1234",
    database: "verterinaria2",
    synchronize: true,
    logging: true,
    entities: [User, Mascota,Especies],
    subscribers: [],
    migrations: [],
})