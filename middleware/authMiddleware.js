import jwt from 'jsonwebtoken';
import Veterinario from '../models/veterinario.js';

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extraer el token del encabezado, formo un array para acceder al segundo atributo que es mi token y no el Bearer
            token = req.headers.authorization.split(' ')[1];

            // Verificar y decodificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Adjuntar informacion decodificada al objeto req
            // console.log(encoded), guardar en la base de datos
            req.veterinario = await Veterinario.findById(decoded.id).select('-password -token -confirmado');

            return next();


        } catch (error) {
            const e = new Error('Token no válido');
            return res.status(403).json({ msg: e.message });
        }
    }

    if (!token) {
        const error = new Error('Token no válido o inexistente');
        return res.status(403).json({ msg: error.message });
    }

    next();
};

export default checkAuth;
