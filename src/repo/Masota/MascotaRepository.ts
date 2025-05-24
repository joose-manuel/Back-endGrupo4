import { Mascota } from '../../Entity/mascota/EntidadMascota';
import { AppDataSource } from "../../Db-conection"; // Ruta relativa correcta

const mascotaRepository = AppDataSource.getRepository(Mascota);


export const MascotaRepository = {
    findAll: async () => mascotaRepository.find(),
    findById: (id: number) => mascotaRepository.findOneBy({ id }),
    
    // Método para crear, importante usar .create() y luego .save()
    create: (data: Partial<Mascota>) => mascotaRepository.save(mascotaRepository.create(data)),
    
    update: async (id: number, data: Partial<Mascota>) => {
        const mascota = await mascotaRepository.findOneBy({ id });
        if (!mascota) return null;
        Object.assign(mascota, data);
        return mascotaRepository.save(mascota);
    },
    remove: async (id: number) => {
        const mascota = await mascotaRepository.findOneBy({ id });
        if (!mascota) return null;
        await mascotaRepository.remove(mascota);
        return mascota;
    },
};