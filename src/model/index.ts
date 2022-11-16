import { MongoClient } from 'mongodb';

const {
  MONGO_URI = 'mongodb+srv://tinkoko:mymongodbpassword@cluster0.7dn1hhp.mongodb.net/tinkoko'
} = process.env;

export const client = new MongoClient(MONGO_URI);

export const db = client.db();