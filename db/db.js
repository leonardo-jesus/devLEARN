async function main() {
  const {MongoClient} = require('mongodb');
  // Connection URI
  const uri = 'mongodb+srv://leonardo-jesus02:a1b2c3d4e5@devlearn-cluster.vlbqd.gcp.mongodb.net/devLEARN-db?retryWrites=true&w=majority';
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