import { MongoClient } from 'mongodb';

// /api/new-meetup

// cia galima aprasyti prisijungimo passwordus ir kita susijusia info, client nemato

// mongodb+srv://neilaAdmin:hidden1234@frakfurtclusteraws.gdyfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

async function handler(req, res) {
  console.log(req.method);
  if (req.method === 'POST') {
    const data = req.body;
    console.log('got data in api/new-meetup', data);

    const client = await MongoClient.connect(
      'mongodb+srv://neilaAdmin:hidden1234@frakfurtclusteraws.gdyfq.mongodb.net/meetupDb?retryWrites=true&w=majority'
    );

    client.close();

    res.status(200).json({ msg: 'success', data });
  }
}

export default handler;
