import { MongoClient } from 'mongodb';

// /api/new-meetup

// cia galima aprasyti prisijungimo passwordus ir kita susijusia info, client nemato

// mongodb+srv://neilaAdmin:hidden1234@frakfurtclusteraws.gdyfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

async function handler(req, res) {
  console.log(req.method);
  if (req.method === 'POST') {
    const data = req.body;
    console.log('got data in api/new-meetup', data);

    let client;

    try {
      client = await MongoClient.connect(process.env.MONGO_CONN);
      const db = client.db();

      // sukurti arba nusitaikyti i esama collection
      const meetupCollection = db.collection('meetups');
      const insertResult = await meetupCollection.insertOne(data);

      res.status(200).json({ msg: 'success', insertResult });
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      client.close();
    }
  }
}

export default handler;
