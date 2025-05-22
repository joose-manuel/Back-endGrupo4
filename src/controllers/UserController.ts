//Importamos express Por que vamos ausar express para hacer las peticiones como get, post, put, delete
//Importamos el tipo de Request y Response de express para definir los tipos de las peticiones y respuestas
import { Request, Response } from "express";
//Importamos el repositorio de usuario que ya traera todos los metodos para interactuar con la base de datos
import { UserRepository } from "../Repository/RepositoryUser";
//Creamos un clase UserController que contendra los metodos para manejar las peticiones
export const UserController = {
    //Definimos el metodo getAll que se encargara de obtener todos los usuarios
    getAll: async (_req: Request, res: Response) => {
        try {
            const users = await UserRepository.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener usuarios", error });
        }
    },
   
    //Definimos el metodo de para subir los datos a la base de datos
    //Este metodo se encargara de crear un nuevo usuario
    create: async (req: Request, res: Response) => {
        try {
            const usuario = await UserRepository.create(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({ message: "Error al crear usuario", error });
        }
    }
   
};