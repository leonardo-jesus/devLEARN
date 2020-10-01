async function main() {
  require('dotenv').config();
  const {MongoClient} = require('mongodb');
  // Connection URI
  const uri = process.env.URI;
  const client = new MongoClient(uri);
 
  try {
    // Connect to the MongoDB Cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  };
};

main().catch(console.error);

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log('Databases: ');
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};