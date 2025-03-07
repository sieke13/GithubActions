import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: string, collectionName: string) => {
    try {
        // Verifica si el modelo existe
        if (!(modelName in models)) {
            throw new Error(`Model "${modelName}" does not exist.`);
        }

        // Verifica si la conexión a la base de datos está abierta
        if (!db || !db.db) {
            throw new Error('Database connection is not established.');
        }

        // Verifica si la colección existe
        const collections = await db.db.listCollections({ name: collectionName }).toArray();

        if (collections.length > 0) {
            // Si la colección existe, la elimina
            await db.dropCollection(collectionName);
            console.log(`Collection "${collectionName}" dropped successfully.`);
        } else {
            console.log(`Collection "${collectionName}" does not exist.`);
        }
    } catch (err) {
        console.error(`Error cleaning collection "${collectionName}":`, err);
        throw err; // Relanza el error para que pueda ser manejado en un nivel superior
    }
};