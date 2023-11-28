import { route } from "../../__types";
import LightingCalculation from './controller';
const controller: LightingCalculation = new LightingCalculation();

const routes: route[] = [
	{ path: controller.__component + '/lighting', method: "post", function: controller.LightingSystem, private: false }
];
export default routes;