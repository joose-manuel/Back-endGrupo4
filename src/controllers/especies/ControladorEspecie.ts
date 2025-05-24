import { Request, Response } from "express";
import { RepositorioMascotaEspecies } from "../../repo/especies/RepoEspecie";



export const ControladorEspecie = {

    getAll: async (_req: Request, res: Response) => {
        try {
            const especies = await RepositorioMascotaEspecies.findAll();
            res.json(especies);
        } catch (error) {
            console.error('Error getting especies:', error); // Añadir log
            res.status(500).json({ message: "Error al obtener especies", error });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const especie = await RepositorioMascotaEspecies.create(req.body);
            res.status(201).json(especie);
        } catch (error) {
            console.error('Error creating especie:', error); // Añadir log
            res.status(500).json({ message: "Error al crear especie", error });
        }
    }

    // Puedes agregar más métodos como update, delete, etc. según sea necesario
    







 }