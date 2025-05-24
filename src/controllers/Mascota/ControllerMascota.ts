import { Request, Response } from "express";

import { MascotaRepository } from "../../repo/Masota/MascotaRepository"; // Asegúrate de que esta importación sea correcta y apunte al único RepositoryMascota.ts

export const MascotaController = {
    getAll: async (_req: Request, res: Response) => {
        try {
            const mascotas = await MascotaRepository.findAll();
            res.json(mascotas);
        } catch (error) {
            console.error('Error getting mascotas:', error); // Añadir log
            res.status(500).json({ message: "Error al obtener mascotas", error });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const mascota = await MascotaRepository.create(req.body);
            res.status(201).json(mascota);
        } catch (error) {
            console.error('Error creating mascota:', error); // Añadir log
            res.status(500).json({ message: "Error al crear mascota", error });
        }
    }


    
};