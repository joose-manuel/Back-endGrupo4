// src/Repository/Usuario/RepositoryUser.ts
import { AppDataSource } from "../../Db-conection"; // Ruta relativa correcta
import { User } from "../../Entity/Usuario/EntidadUser"; // Ruta relativa corregida

const userRepository = AppDataSource.getRepository(User);

export const UserRepository = {
    findAll: async () => userRepository.find(),
    findById: (id: number) => userRepository.findOneBy({ id }),
    
    // Método para crear, importante usar .create() y luego .save()
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
    },
    // Método clave para login/registro
    findByCorreo: (correo: string) => userRepository.findOneBy({ correo }),
};