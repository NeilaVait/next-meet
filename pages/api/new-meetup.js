import { getCollection } from '../../utils/mongo-data';

// /api/new-meetup

// cia galima aprasyti prisijungimo passwordus ir kita susijusia info, client nemato

// mongodb+srv://neilaAdmin:hidden1234@frakfurtclusteraws.gdyfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

async function handler(req, res) {
  console.log(req.method);
  if (req.method === 'POST') {
    const data = req.body;
    console.log('got data in api/new-meetup', data);

    try {
      const [meetupCollection] = await getCollection();

      const insertResult = await meetupCollection.insertOne(data);

      res.status(201).json({ msg: 'success', insertResult });
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      const [client] = await getCollection();
      client.close();
    }
  }
}

export default handler;
