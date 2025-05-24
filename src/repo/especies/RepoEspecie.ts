import { Especies } from "../../Entity/especies/EntidadEspecie";
import { AppDataSource } from "../../Db-conection";

const mascotaEspecies = AppDataSource.getRepository(Especies);

export const  RepositorioMascotaEspecies = {
    findAll: async () => mascotaEspecies.find(),
   findById : (id: number) => mascotaEspecies.findOneBy({ id_especie: id }),
    
    // Método para crear, importante usar .create() y luego .save()
    create: (data: Partial<Especies>) => mascotaEspecies.save(mascotaEspecies.create(data)),
    
    update: async (id: number, data: Partial<Especies>) => {
        const especie = await mascotaEspecies.findOneBy({ id_especie: id });
        if (!especie) return null;
        Object.assign(especie, data);
        return mascotaEspecies.save(especie);
    },
    remove: async (id: number) => {
        const especie = await mascotaEspecies.findOneBy({ id_especie: id });
        if (!especie) return null;
        await mascotaEspecies.remove(especie);
        return especie;
    },
};
export const RepoEspecie = {









}