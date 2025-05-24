// src/controllers/Login/ControladorLogin.ts
import { Request, Response } from 'express';
import { UserRepository } from '../../repo/Usuario/RepositoryUser';
import { User } from '../../Entity/Usuario/Usuario/EntidadUser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_JWT_fuerte_aqui';

// Registro de usuario
export const register = async (req: Request, res: Response) => {
    // AHORA EXTRAEMOS TODOS LOS CAMPOS NECESARIOS
    const { correo, contraseña, nombre, fechaDeNacimiento } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const existingUser = await UserRepository.findByCorreo(correo);
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const newUser = new User();
        newUser.correo = correo;
        newUser.contraseña = contraseña;
        newUser.nombre = nombre; // <--- AÑADIDO: Asignar el nombre
        newUser.fechaDeNacimiento = fechaDeNacimiento; // <--- AÑADIDO: Asignar la fecha de nacimiento
        // rol y estado tienen valores por defecto en la entidad, no necesitas asignarlos aquí a menos que quieras cambiarlos
        // newUser.rol = 'user'; // Ya es el default
        // newUser.estado = true; // Ya es el default

        await newUser.hashPassword(); // Hashear la contraseña

        const savedUser = await UserRepository.create(newUser); // Guardar el nuevo usuario

        // Opcional: No devolver la contraseña en la respuesta
        const { contraseña: _, ...userWithoutPassword } = savedUser;

        return res.status(201).json({ message: 'User registered successfully!', user: userWithoutPassword });
    } catch (error: any) { // Usamos 'any' aquí para acceder a 'error.message'
        console.error('Error registering user:', error);
        // Mejorar el mensaje de error para depuración
        return res.status(500).json({ message: 'Error registering user', details: error.message || 'Unknown error' });
    }
};

// Login de usuario (sin cambios, ya que no necesita los campos adicionales para login)
export const login = async (req: Request, res: Response) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await UserRepository.findByCorreo(correo);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials (user not found)' });
        }

        const isPasswordValid = await user.comparePassword(contraseña);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials (password incorrect)' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.correo, role: user.rol },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error: any) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Error logging in', details: error.message || 'Unknown error' });
    }
};