import * as bodyParser from 'body-parser';
import express from 'express';
import * as http from 'http';
import Validator from 'validatorjs';
import config from "../config/config";
//import { MiddleWare } from '../core';
// import { db } from "../database/db";
import Routes from '../core/router';
import { collections, connectToDatabase } from '../database/db';
import Seed from '../database/seed/seed-db';
var cors = require('cors')

export default class Server {
	private routes: Routes = new Routes();
	//private middleWare: MiddleWare = new MiddleWare();
	private app: any;

	public static bootstrap(): Server {
		return new Server();
	}


	public constructor() {
		global['config'] = config;
		this.app = express();
		this.app.use((req, res, next) => {
		  
			// TODO Add origin validation
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Credentials', true);
			res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
		  
			// intercept OPTIONS method
			if (req.method === 'OPTIONS') {
			  res.sendStatus(204);
			} else {
			  next();
			}
		  });
		this.app.options('*', cors());
		this.config();
	}

	public async run(port: number, callback?: () => void): Promise<http.Server> {
		const db = await connectToDatabase();
		if (config.syncDb) {
			db.dropDatabase();
			// await db.sequelize.sync({
			// 	force: true,
			// });
			const seed = new Seed();
			await seed.runSeed();
		}
		this.registerCustomValidations();
		if (callback) {
			return this.app.listen(port, callback);
		}

		return this.app.listen(port);
	}
	private registerCustomValidations() {
		Validator.registerAsync('exist', function (value: string, attribute, req, passes) {
			if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:collection,column');
			let attArr = attribute.split(",");

			if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);
			const { 0: collection, 1: column } = attArr;

			let msg = (column == "username") ? `${column} has already been taken ` : `${column} already in use`
			let query = {};
			query[column] = value
			let projection = {};
			projection[column] = 1;
			collections[collection]?.findOne(query, { projection }).then(result => {
				if (result) {
					passes(false, msg); // if username is not available
				} else {
					passes(true);
				}
			});
		}, "Username has already been taken.");
	}
	private async config() {
		/** Register lib middlewares */
		this.app.use(bodyParser.json({ limit: '10mb' }));
		this.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
		this.app.use('/files', express.static('files'));
	
		await this.routes.setRoutes();
		/** Register application router */
		//this.app.use(this.middleWare.crosHeaders);
		this.app.use(this.routes.route);
		// this.app.use(this.middleWare.TokenValidator);
		// this.app.use(this.routes.privateRoutes);
	}
}
