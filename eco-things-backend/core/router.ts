import { Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { route } from '../__types';
import { MiddleWare } from './';
export default class Routes {
	// Set type as Router if need to get auto compelete from vscode
	private routes: Router = Router();
	private middleWare: MiddleWare = new MiddleWare();
	public constructor() {
		// Reading Component
	}
	public async setRoutes() {
		await fs.readdirSync(path.join(__dirname, '../components')).forEach(async (dir: string) => {
			// Reading routes Dir and filtering only route.ts files
			await fs.readdirSync(path.join(__dirname, '../components/' + dir)).filter((file: string) =>
				(file == 'route.ts' || file == 'route.js')).forEach((routeFile: string) => {
					// Dynamicly Importing routes and setting them in private or public routers
					import('../components/' + dir + '/' + routeFile.replace('.ts', '').replace('.js', '')).then((mode: { default: route[] }) => {
						mode.default
							.forEach(route => {
								this.setRoute(route);
							});
					});
				});
			await fs.readdirSync(path.join(__dirname, '../components/' + dir)).filter((file: string) =>
				(file.indexOf('.ts') === -1 && file.indexOf('.js') === -1)).forEach(async (childDir: string) => {
					// Dynamicly Importing routes and setting them in private or public routers
					await fs.readdirSync(path.join(__dirname, '../components/' + dir + '/' + childDir)).filter((file: string) =>
						(file == 'route.ts' || file == 'route.js')).forEach((routeFile: string) => {
							// Dynamicly Importing routes and setting them in private or public routers
							import('../components/' + dir + '/' + childDir + '/' + routeFile.replace('.ts', '').replace('.js', '')).then((mode: { default: route[] }) => {
								mode.default
									.forEach(route => {
										this.setRoute(route);
									});
							});
						});
				});
		});
	}
	private setRoute(route: route): void {
		let args = [] as any;
		if (route.path) {
			args.push('/api/' + route.path);
		}
		if(route.private) {
			args.push(this.middleWare.TokenValidator);
		}
		if(route.filter) {
			let search: string[] = [];
			if (route.search) {
				search = route.search;
			}
			args.push(this.middleWare.setFiltersAndSorting(search));
		}
		if (route.permission && route.perm_component) {
			args.push(this.middleWare.permission(route.perm_component, route.permission));
		}
		if (route.uploader) {
			args.push(route.uploader);
		}
		if (route.function) {
			args.push(route.function);
		}
		this.routes[route.method](...args);
		// this.setPrivate(route);
		// if (route.private) {
		// } else {
		// 	this.setPublic(route);
		// }
	}
	// private setPrivate(route: route): void {
	// 	let args = [] as any;
	// 	if (route.path) {
	// 		args.push('/api/' + route.path);
	// 	}
	// 	// if(route.private)
	// 	args.push(this.middleWare.TokenValidator);
	// 	if (route.permission && route.perm_component) {
	// 		args.push(this.middleWare.permission(route.perm_component, route.permission));
	// 	}
	// 	if (route.uploader) {
	// 		args.push(route.uploader);
	// 	}
	// 	if (route.function) {
	// 		args.push(route.function);
	// 	}
	// 	this.routes[route.method](...args);
	// 	// if (route.uploader !== undefined) {
	// 	// 	this.privateRouter[route.method]('/api/' + route.path, route.uploader, route.function);
	// 	// } else {
	// 	// 	this.privateRouter[route.method]('/api/' + route.path, route.function);
	// 	// }
	// }
	// private setPublic(route: route): void {
	// 	if (route.uploader !== undefined) {
	// 		this.publicRouter[route.method]('/api/' + route.path, route.uploader, route.function);
	// 	} else {
	// 		this.publicRouter[route.method]('/api/' + route.path, route.function);
	// 	}
	// }
	get route() {
		return this.routes;
	}
	// get publicRoutes() {
	// 	return this.publicRouter;
	// }
}