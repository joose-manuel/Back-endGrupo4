import nodemailer from 'nodemailer';

class EmailController {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // Usar TLS
            auth: {
                user: process.env.EMAIL_USER || '', // Usuario desde .env
                pass: process.env.EMAIL_PASS || ''  // Contraseña desde .env
            }
        });
    }

    async sendEmail(to: string, subject: string, text: string) {
        try {
            const info = await this.transporter.sendMail({
                from: process.env.EMAIL_USER || '', // Dirección del remitente
                to, // Dirección del destinatario
                subject, // Asunto del correo
                text // Contenido del correo
            });
            console.log('Email sent:', info.messageId);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

export default EmailController;