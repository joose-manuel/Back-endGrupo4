import { Request, Response } from "express";
// Asegúrate de que esta importación sea correcta y apunte al único RepositoryUser.ts
import { UserRepository } from "../repo/Usuario/RepositoryUser"; 

export const UserController = {
    getAll: async (_req: Request, res: Response) => {
        try {
            const users = await UserRepository.findAll();
            res.json(users);
        } catch (error) {
            console.error('Error getting users:', error); // Añadir log
            res.status(500).json({ message: "Error al obtener usuarios", error });
        }
    },
   
    create: async (req: Request, res: Response) => {
        try {
            const usuario = await UserRepository.create(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            console.error('Error creating user:', error); // Añadir log
            res.status(500).json({ message: "Error al crear usuario", error });
        }
    }
};