import { MongoClient, Db } from "mongodb";
import config from "../config/config";
/**
 * @class BaseController
 */
export class Database {
	public db: Db
	constructor() {
		this.connectDb();
	}
	private connectDb = async () => {
		if(!this.db) {
			const client: MongoClient = new MongoClient(config.db.DB_CONN_STRING);
			await client.connect();
			this.db = client.db(config.db.DB_NAME);
		}
	}
	
}
