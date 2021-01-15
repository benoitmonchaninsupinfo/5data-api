require('dotenv').config();
const MongoClient = require('mongodb');

const dbUrl = process.env.MONGO_DB_PROTOCOL + '://' + process.env.MONGO_DB_LOGIN + ':' + process.env.MONGO_DB_PASSWORD + '@' + process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB_NAME;

const mongoDBOptions = {useUnifiedTopology: true, useNewUrlParser: true};

module.exports = class MongoDB {
    constructor(collection) {
        this.collection = collection;
    }

    async insertOne(data) {
        const client = await MongoClient.connect(dbUrl, mongoDBOptions);
        const db = client.db(dbName);
        const result = await db.collection(this.collection).insertOne(data).toArray();
        client.close();
        return result;
    }

    async find(filter) {
        const client = await MongoClient.connect(dbUrl, mongoDBOptions);
        const db = client.db(dbName);
        const result = await db.collection(this.collection).find(filter).toArray();
        client.close();
        return result;
    }
}
