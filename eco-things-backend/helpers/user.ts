import config from "../config/config";
import jwt from 'jsonwebtoken';
import { collections } from "../database/db";
import { ObjectId } from "mongodb";

export default class UserHelper {

	// static hasPermissions = (user: SessionUser, role): boolean => {
	// 	if (user.role === role) {
	// 		return true;
	// 	}
	// 	return false;
	// }

	static updateToken = async (user_id: ObjectId): Promise<string> => {
		const result = await collections.users?.aggregate([
			{ $match: { _id: user_id } },
			{
				$lookup: {
					from: "roles",
					localField: "roleId",
					foreignField: "_id",
					as: "role"
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
					email: 1,
					roleId: 1,
					role: { $first: '$role' }
				}
			}
		]).toArray();
		if (result) {
			return jwt.sign(result[0], config.secret, {
				expiresIn: config.tokenLife
			});
		}
		return "";
	}

	// static logEvent = async (event: string, user_id: number | null = null): Promise<void> => {
	// 	if (user_id || global['user']) {
	// 		if (global['user']) {
	// 			user_id = global['user'].id;
	// 		}
	// 		await UserLog.create({
	// 			user_id: user_id,
	// 			event: event
	// 		});
	// 	}
	// }

	// static sendVerification = async (code, verification_bit) => {
	// 	await UserVerification.create({
	// 		code: code,
	// 		verification_bit: verification_bit,
	// 		expire: moment().add(2, 'hours')
	// 	});
	// }
}