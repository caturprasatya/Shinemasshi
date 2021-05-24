const { MongoClient } = require("mongodb")

const uri = 'mongodb://localhost:27017'
// const uri_atls = ''
let database = null

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function connect() {
  try {
    await client.connect();
    database = client.db('entertainme')
    // const movies = database.collection('Movies');
    // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    // const movie = await movies.findOne(query)
    // console.log(movies);
    return true
    } catch(err) {
    // Ensures that the client will close when you finish/error
    await client.close()
    return false
  }
}

function  getDatabase() {
  return database
}

module.exports = {
  connect,
  getDatabase
}