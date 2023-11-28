import config from "../config/config";
import { pagination } from '../__types';
export default class Paginator {
	get(req: any): pagination {
		let { page, page_size, _page } = req.query;
		// tslint:disable-next-line: radix
		page = parseInt(page);
		// tslint:disable-next-line: radix
		page_size = parseInt(page_size);
		if (page) {
			page = page - 1;
		}
		if (typeof page_size == 'undefined' || Number.isNaN(page_size)) {
			page_size = config.pagination.page_size;
		}
		if (_page) {
			page_size = 1000;
		} else {
			page_size = (page_size <= config.pagination.maxLimit) ? page_size : config.pagination.maxLimit;
		}
		const limit = page_size;
		const offset = page ? page * limit : config.pagination.offset;
		return { limit: limit, offset: offset };
	}
	
}