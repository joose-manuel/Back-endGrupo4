import { DataSource } from "typeorm";
import { User } from "./Entity/EntidadUser";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 6543,
    username: "dbadmin",
    password: "password",
    database: "dm5",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})