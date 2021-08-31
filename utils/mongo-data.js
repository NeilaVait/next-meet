import { MongoClient } from 'mongodb';

export async function getCollection() {
  const client = await MongoClient.connect(process.env.MONGO_CONN);
  const db = client.db();
  // sukurti arba nusitaikyti i esama collection
  const meetupCollection = db.collection('meetups');
  const allMeets = await meetupCollection.find({}).toArray();
  client.close();
  return allMeets;
}
