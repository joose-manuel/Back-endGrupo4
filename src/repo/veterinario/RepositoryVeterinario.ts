import { AppDataSource } from "../../Db-conection";
import { Veterinarios } from "../../Entity/veterinario/EntidadVeterinario";

const veterinarioRepository = AppDataSource.getRepository(Veterinarios);
export const RepositoryVeterinario = {
    findAll: async () => veterinarioRepository.find(),
    findById: (id: number) => veterinarioRepository.findOneBy({ id_veterinario: id }),
    
    // Método para crear, importante usar .create() y luego .save()
    create: (data: Partial<Veterinarios>) => veterinarioRepository.save(veterinarioRepository.create(data)),
    
    update: async (id: number, data: Partial<Veterinarios>) => {
        const veterinario = await veterinarioRepository.findOneBy({ id_veterinario: id });
        if (!veterinario) return null;
        Object.assign(veterinario, data);
        return veterinarioRepository.save(veterinario);
    },
    remove: async (id: number) => {
        const veterinario = await veterinarioRepository.findOneBy({ id_veterinario: id });
        if (!veterinario) return null;
        await veterinarioRepository.remove(veterinario);
        return veterinario;
    },
};