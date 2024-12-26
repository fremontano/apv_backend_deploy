import mongoose from 'mongoose';



const connection = async () => {
    try {

        const db = await mongoose.connect(process.env.MONGO_URI);

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`Mongo db connectado en ${url}`);

    } catch (error) {
        console.log(`Error al conectar a MongoDB: ${error.message}`);
        console.log(error.stack);
        process.exit(1);
    }
}



export default connection;