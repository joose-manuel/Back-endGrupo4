import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import bcrypt from 'bcryptjs';
import { Mascota } from "../mascotas/EntidadMascota";
import { Veterinarios } from "../veterinario/EntidadVeterinario";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column("text")
    nombre: string | undefined;

    @Column("text")
    correo: string | undefined;

    @Column("text")
    contraseña: string | undefined;

    @Column("date")
    fechaDeNacimiento: string | undefined;

    @Column({ type: "boolean", default: true })
    estado: boolean | undefined;

    @Column({ type: "varchar", length: 50, default: "user" })
    rol: string | undefined;

    // Relación con Mascota: Un usuario puede tener muchas mascotas
    @OneToMany(() => Mascota, (mascota) => mascota.user)
    mascotas: Mascota[] | undefined;

    // Relación muchos a muchos con Veterinarios
    @ManyToMany(() => Veterinarios, (veterinario) => veterinario.usuarios)
    @JoinTable() // Necesario para definir la tabla intermedia
    veterinarios: Veterinarios[] | undefined;

    async hashPassword() {
        if (this.contraseña) {
            this.contraseña = await bcrypt.hash(this.contraseña, 10);
        }
    }

    async comparePassword(candidatePassword: string): Promise<boolean> {
        if (!this.contraseña) {
            return false;
        }
        return bcrypt.compare(candidatePassword, this.contraseña);
    }
}

