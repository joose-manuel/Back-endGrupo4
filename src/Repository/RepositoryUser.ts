//importamos la conexion a la base de datos
import { AppDataSource } from "../Db-conection";
//Importamos la entidad de usuario
import { User } from "../Entity/EntidadUser";
//Aqui realizo una injecion de dependencias
//De la entidad de user
const userRepository = AppDataSource.getRepository(User);

//Definimos el repositorio de usuario
//Este repositorio contendrá métodos para interactuar con la base de datos

export const UserRepository = {
    //Definimos los métodos para interactuar con la base de datos
    //findAll: Método para obtener todos los usuarios
    //findById: Método para obtener un usuario por su ID
    //create: Método para crear un nuevo usuario
    //update: Método para actualizar un usuario existente
    //remove: Método para eliminar un usuario por su ID
    //findAll: async () => userRepository.find(),
    findAll: () => userRepository.find(),
    //
    findById: (id: number) => userRepository.findOneBy({ id }),

    create: (data: Partial<User>) => userRepository.save(userRepository.create(data)),
    
    update: async (id: number, data: Partial<User>) => {
        const user = await userRepository.findOneBy({ id });
        if (!user) return null;
        Object.assign(user, data);
        return userRepository.save(user);
    },
    remove: async (id: number) => {
        const user = await userRepository.findOneBy({ id });
        if (!user) return null;
        await userRepository.remove(user);
        return user;
    }
};