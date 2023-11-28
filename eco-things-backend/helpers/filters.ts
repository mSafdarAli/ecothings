
export default class Filter {
	private params: object;
	private fields: string[];
	public filters: object[] = [];
	public order: any = [];
	public pagination: Object;
	constructor(params: object) {
		this.params = params;
		this.fields = Object.keys(this.params);
		this.getFilters();
		this.sorter();
		this.paginator();
	}
	private getFilters = async () => {
		const data: {} = {};
		this.fields.forEach(field => {
			let [column, operator] = field.split("__");
			if (operator) {
				if(operator === "eq") {
					data[column] = this.params[field];
				} else {
					if (!data[column]) {
						data[column] = {};
					}
					data[column][operator] = this.params[field];
				}
			}
		});
		if(Object.keys(data).length > 0) {
			this.filters.push({$match: data});
		}
		// this.filters = data;
		// this.fields.filter(e => e.endsWith("__eq")).forEach(column => {
		// 	let field = column.replace("__eq", "");
		// });
		// this.fields.filter(e => e.endsWith("__in")).forEach(column => {
		// 	let field = column.replace("__in", "");
		// });
		// this.fields.filter(e => e.endsWith("__in")).forEach(column => {
		// 	let field = column.replace("__in", "");
		// 	data[field] = { $in: this.params[column] };
		// });
		// const tables = Object.keys(this.rules);
		// tables.forEach(table => {
		// 	this.filters[table] = {};
		// 	const dbModel = this.rules[table];
		// 	const searchFilter = this.searchFilter(dbModel.search);
		// 	const eq = this.eq(table, dbModel.filters);
		// 	const gt = this.gt(table, dbModel.filters);
		// 	// const ilike = this.ilike(table, dbModel.filters);
		// 	if (searchFilter) {
		// 		Object.assign(this.filters[table], searchFilter);
		// 	}
		// 	if (eq) {
		// 		Object.assign(this.filters[table], eq);
		// 	}
		// 	if (gt) {
		// 		Object.assign(this.filters[table], gt);
		// 	}
		// 	// if (Object.keys(ilike).length > 0) {
		// 	// 	Object.assign(this.filters[table], ilike);
		// 	// }
		// });
	}
	// private gt(table: string, filters: string[]) {
	// 	const attrs = ['gt', 'gte', 'lt', 'lte'];
	// 	const data: WhereOptions = {};
	// 	attrs.forEach(att => {
	// 		const attr = '__' + att;
	// 		filters.forEach(field => {
	// 			const qpm = table + '_' + field + attr;
	// 			if (this.params[qpm] !== undefined) {
	// 				data[field] = { [Op[att]]: this.params[qpm] };
	// 			}
	// 		});
	// 	});
	// 	return data;
	// }
	// private ilike(table: string, filters: string[]) {
	// 	const attrs = ['ilike'];
	// 	const data: WhereOptions = {};
	// 	attrs.forEach(att => {
	// 		const attr = '__' + att;
	// 		filters.forEach(field => {
	// 			const qpm = table + '_' + field + attr;
	// 			if (this.params[qpm] !== undefined) {
	// 				data[field] = { [Op[att]]: '%' + this.params[qpm] + '%' };
	// 			}
	// 		});
	// 	});
	// 	return data;
	// }
	private sorter = (): void => {
		let rawParm = '_id';
		let order = 1;
		if (this.params['orderby']) {
			rawParm = this.params['orderby'];
		}
		if (this.params['orderdir']) {
			order = parseInt(this.params['orderdir']);
		}
		let sort = {'$sort': {}};
		sort["$sort"][rawParm] = order;
		this.filters.push(sort)
		// this.order.push([rawParm, order]);
	}
	private paginator = (): void => {
		let page = 1;
		let page_size = global['config'].pagination.page_size;
		if (this.params['page']) {
			page = parseInt(this.params['page']);
		}
		if (this.params['page_size']) {
			page_size = parseInt(this.params['page_size']);
		}
		if (page) {
			page = page - 1;
		}

		if (page_size > global['config'].pagination.maxLimit) {
			page_size = global['config'].pagination.maxLimit;
		}
		const skip = page * page_size;
		this.filters.push(
			
		)
		this.pagination = {
			'$facet': {
				metadata: [{ $count: "total" }, { $addFields: { page: page } }],
				data: [{ $skip: skip }, { $limit: page_size }] // add projection here wish you re-shape the docs
			}
		};
	}
}