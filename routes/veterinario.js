import express from 'express';
import { perfil, registrar, confirmar, autenticar, olvidoPassword, comprobarToken, nuevoPassword, actualizarPerfil, actualizarPassword } from '../controllers/veterinario.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();



// Rutas publica 
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvido-password', olvidoPassword);
router.route('/olvido-password/:token').get(comprobarToken).post(nuevoPassword);



// Rutas protegidas 
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.put('/actualizar-password', checkAuth, actualizarPassword);



export default router;