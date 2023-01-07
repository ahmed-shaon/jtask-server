const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4dokkij.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('jobTask').collection('users');

        app.post('/sendemail', async (req, res) => {
            const user = req.body;
            const query = { email: user.email };
            const email = await userCollection.findOne(query);
            if (!email) {
                const result = await userCollection.insertOne(user);
                res.send(result);
            }
            else{
                res.send({message:"Already subscribed with this email. Thank you."})
            }

        })

    }
    finally {

    }
}

run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send("Server is running");
})

app.listen(port, () => {
    console.log(`Server is running on prot ${port}`);
})