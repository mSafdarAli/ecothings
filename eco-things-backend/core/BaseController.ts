import Utility from '../helpers/utility';
import { Response } from '../__types';
/**
 * @class BaseController
 */
export class BaseController extends Utility {

	private errors: { [key: string]: string } = {
		permission: "You Don't have permission",
		notfound: "Data Not Found",
		invalid: "Invalid Request",
		exist: "% already Exist",
		required: "Please provide required Info",
		create: 'Unable to create %',
		update: 'Unable to update %',
		list: 'Unable to load %',
		get: 'Unable to load %',
		cantdelete: 'Can\'t delete this %, because this % profile has been used.',
		delete: 'Can\'t delete this %, Error occurred',
		dontexist: '% doesn\'t exist',
		login: 'Please Login to continue',
		token: 'Failed to authenticate token.',
		wrong: 'Something went wrong please try again latter.',
	};
	constructor() {
		super();
	}
	protected json = (res: Response, statusCode: number, data?: object | null, message?: string, token?: string): Response => {
		let resp = { success: true, error: false, pagination: { total: 1, page: 1, page_size: global['config'].pagination.page_size } };
		if(data) {
			if (data["pagination"] && data["pagination"].length > 0) {
				resp.pagination = data["pagination"][0];
			} else {
				resp.pagination.total = 0;
			}
			if (data["data"]) {
				resp["data"] = data["data"];
			} else {
				resp["data"] = data;
			}
			// resp = Object.assign(resp, data)
		} else {
			resp["data"] = null;
		}
		if(message) {
			resp["message"] = message;
		}
		if(token) {
			resp["token"] = token;
		}
		return res.status(statusCode).json(resp);
	}
	protected jsonError = async (res: Response, statusCode: number, component?: string, error?, exception?) => {
		if (exception) {
			console.log(exception);
		}
		if (!error) {
			return res.sendStatus(statusCode);
		}
		return res.status(statusCode).json(this.error((component ? component : ""), error));
	}
	protected error = (component: string, error) => {
		if (this.errors[error]) {
			return { success: false, error: true, message: this.errors[error].replace(/%/g, component.charAt(0).toUpperCase() + component.slice(1)) };
		} else {
			return { success: false,  error: true, message: error };
		}
	}
}
