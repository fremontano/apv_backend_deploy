
import Paciente from '../models/Pacientes.js';



const agregarPaciente = async (req, res) => {

    const { fechaAlta, ...datosPaciente } = req.body;

    const fechaDeAlta = fechaAlta ? new Date(fechaAlta) : new Date();

    // Crear una nueva instancia de Paciente con los datos del cuerpo de la solicitud
    const paciente = new Paciente({
        ...datosPaciente,
        fechaDeAlta
    });

    // Asignar el veterinario autenticado al paciente
    paciente.veterinario = req.veterinario._id;

    try {

        // Guardar el paciente 
        const pacienteAlmacenado = await paciente.save();

        return res.status(200).json({
            msg: 'Paciente almacenado exitosamente',
            pacienteAlmacenado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al agregar el paciente" });
    }
};



const obtenerPacientes = async (req, res) => {
    try {
        // garantizar que un veterinario solo vea los pacientes que le pertenecen con where, equals
        const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);
        res.json(pacientes);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener pacientes' });

    }
}



const obtenerPaciente = async (req, res) => {

    const { id } = req.params;

    const paciente = await Paciente.findById(id);

    if (!paciente) {
        return res.status(404).json({ msg: 'Paciente no encontrado' });
    }

    // Verificar si el veterinario es el mismo
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(403).json({ msg: 'Acción no válida' });
    }

    //El veterinario esta autorizado para ver el paciente
    if (paciente) {
        res.json(paciente);
    }
}



const actualizarPaciente = async (req, res) => {
    const { id } = req.params;

    // Buscar el paciente por su id
    const paciente = await Paciente.findById(id);

    // Verificar si el paciente existe
    if (!paciente) {
        return res.status(404).json({ msg: 'Paciente no encontrado' });
    }

    // Verificar si el veterinario autenticado es el mismo que el del paciente
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(403).json({ msg: 'Acción no válida' });
    }

    // Actualizar los campos del paciente si se pasan datos en la solicitud
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fechaDeAlta = req.body.fechaDeAlta || paciente.fechaDeAlta;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al actualizar el paciente' });
    }
};


const eliminarPaciente = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar paciente por id
        const paciente = await Paciente.findById(id);

        if (!paciente) {
            return res.status(404).json({ msg: 'Paciente no encontrado' });
        }

        // Verificar si el veterinario autenticado es el propietario del paciente
        if (paciente.veterinario.toString() !== req.veterinario._id.toString()) {
            return res.status(403).json({ msg: 'Acción no válida' });
        }

        // Eliminar paciente
        await paciente.deleteOne();
        res.json({ msg: 'Paciente eliminado' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al eliminar el paciente' });
    }
};



export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}



// Nota
//Se usa .toString() para asegurar que la comparación de ObjectId sea precisa.
//MongoDB genera ObjectId, que son objetos, y al convertirlos a string,
//se realiza una comparación directa de sus valores, no de sus referencias.
//Esto permite comparar los ObjectId de manera similar a como se comparan cadenas de texto simples, evitando que se compare solo la referencia del objeto.