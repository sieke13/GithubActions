import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    if (models[modelName]) {
      let modelExists = await models[modelName].db.db.listCollections({
        name: collectionName
      }).toArray();

      if (modelExists.length) {
        await db.dropCollection(collectionName);
      }
    } else {
      throw new Error(`${modelName} does not exist in models.`);
    }
  } catch (err) {
    throw err;
  }
}