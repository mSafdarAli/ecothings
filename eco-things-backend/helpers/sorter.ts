export default class Sorter {
	__sort: any = {
		products: {
			default: 'created_at',
			sale: 'sale',
			price: 'price',
			created_at: 'created_at',
		},
		navigation: {
			default: 'sort',
			sort: 'sort'
		},
	};
	sorter(req: any, component: string): any {
		const { ordering } = req.req.query;
		let order = '';
		let orderby = '';
		if (ordering && ordering.search('-') == -1) {
			order = 'ASC';
			orderby = ordering;
		} else if (ordering && ordering.search('-') != -1) {
			order = 'DESC';
			orderby = ordering.replace('-', '');
		} else {
			order = 'ASC';
			orderby = ordering ? ordering.replace('-', '') : '';
		}
		if (orderby && this.__sort[component][orderby.toLowerCase()]) {
			orderby = this.__sort[component][orderby.toLowerCase()];
		} else {
			orderby = this.__sort[component]['default'];
		}
		return [[orderby, order]];
	}
}