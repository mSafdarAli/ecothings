import { ObjectId } from "mongodb";
import Utility from "../../helpers/utility";
import { Country, Role, User } from "../../models";
import { collections } from "../db";
import { counry_list } from "./countries_list";
import { Roles } from "./roles";

const utility = new Utility;
const data: {
	roles: Role[]
	users: User[]
	countries: Country[]
} = {
	roles: Roles,
	users: [
		{ _id: new ObjectId(), name: "Ali Shan", email: "shanklq@gmail.com", roleId: Roles[0]._id, ...utility.passwordEn("Test@123"), terms: true }
	],
	countries: counry_list
}
export default class Seed {
	public async runSeed() {
		await collections.roles?.insertMany(data.roles);
		await collections.users?.insertMany(data.users);
		await collections.countries?.insertMany(data.countries);
		console.log('Data is seeded');
	}
}