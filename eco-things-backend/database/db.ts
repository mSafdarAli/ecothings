import { Collection , Db, MongoClient } from "mongodb";
import config from "../config/config";
import { Campaign, Country, Role, Subscriber, User } from "../models";
const tables = ['users', 'countries', 'campaigns', 'subscribers', 'roles'];
export const collections: {
	users?: Collection<User>,
	countries?: Collection<Country>,
	campaigns?: Collection<Campaign>,
	subscribers?: Collection<Subscriber>
	roles?: Collection<Role>
} = {}

export async function connectToDatabase() {

	const client: MongoClient = new MongoClient(config.db.DB_CONN_STRING);

	await client.connect();

	const db: Db = client.db(config.db.DB_NAME);
	
	tables.forEach((collection) => {
		collections[collection] = db.collection(collection);
	})
	return db;
}