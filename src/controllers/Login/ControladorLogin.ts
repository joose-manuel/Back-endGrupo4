// src/controllers/Login/ControladorLogin.ts
import { Request, Response } from 'express';
import { UserRepository } from '../../repo/Usuario/RepositoryUser';
import { User } from "../../Entity/Usuario/EntidadUser";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import EmailController from '../../Helpers/gemail';


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_JWT_fuerte_aqui';

// Registro de usuario
export const register = async (req: Request, res: Response) => {
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
        newUser.nombre = nombre;
        newUser.fechaDeNacimiento = fechaDeNacimiento;

        await newUser.hashPassword(); // Hashear la contraseña

        const savedUser = await UserRepository.create(newUser); // Guardar el nuevo usuario

        // Enviar correo de bienvenida
        try {
            const mailController = new EmailController();
            await mailController.sendEmail(
                correo, // Correo del usuario registrado
                'Bienvenido a nuestra plataforma',
                `Hola ${nombre}, gracias por registrarte en nuestra plataforma.`
            );
        } catch (error) {
            console.error('Error sending welcome email:', error);
        }

        // Generar token JWT
        const token = jwt.sign(
            {
                id: savedUser.id,
                correo: savedUser.correo,
                rol: savedUser.rol,
                nombre: savedUser.nombre,
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Responder con el token y los datos del usuario
        const { contraseña: _, ...userWithoutPassword } = savedUser;
        return res.status(201).json({
            message: 'User registered successfully!',
            token,
            user: userWithoutPassword,
        });

    } catch (error: any) {
        console.error('Error registering user:', error);
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
            { 
                id: user.id, 
                username: user.correo, 
                rol: user.rol,
                nombre: user.nombre,
                correo: user.correo // Aseguramos que el correo también esté en el token
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Enviar correo de notificación de login
        try {
            const mailController = new EmailController();
            await mailController.sendEmail(
                correo, // Correo del usuario
                'Inicio de sesión exitoso',
                `Hola ${user.nombre}, has iniciado sesión en nuestra plataforma.`
            );
        } catch (error) {
            console.error('Error sending login notification email:', error);
        }

        return res.status(200).json({ 
            message: 'Login successful', 
            token,
            user: {
                id: user.id,
                correo: user.correo,
                rol: user.rol,
                nombre: user.nombre // Agregar el nombre del usuario
            }
        });

    } catch (error: any) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Error logging in', details: error.message || 'Unknown error' });
    }
};