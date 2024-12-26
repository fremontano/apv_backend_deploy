import mongoose from 'mongoose';

const pacientesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    propietario: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    fechaDeAlta: {
        type: Date,
        required: true,
        default: Date.now,
    },
    sintomas: {
        type: String,
        required: true,
    },
    // Relacion entre paciente y veterinario
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario',
    },
},
    // Habilita createdAt y updatedAt automáticamente
    {
        timestamps: true,
    });

const Paciente = mongoose.model('Paciente', pacientesSchema);
export default Paciente;
