import nodemailer from 'nodemailer';

export const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const { email, nombre, token } = datos;

    // Enviar email
    const info = await transport.sendMail({
        from: 'APV - Administrador de Pacientes Veterinaria',
        to: email,
        subject: 'Restablece tu password ',
        text: 'Restablece tu password ',
        html: `
            <p>Hola ${nombre}, has solicitado restablecer tu password.</p>
            <p>Sigue el siguiente enlace para generar un nuevo password:</p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a>
            <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje.</p>
        `,
    });

};
