const mongoose = require('mongoose');

const uri = process.env.DATABASE_URI;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
    try {
        await mongoose.connect(uri, clientOptions);
    }catch(err){
        console.log("Couldn't connect to Database", err);
    }
}

run().catch(console.dir);