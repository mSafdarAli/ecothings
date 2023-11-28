import { route } from "../../__types";
import CoolingCalculation from "./controller";
const controller: CoolingCalculation = new CoolingCalculation();

const routes: route[] = [
  {
    path: controller.__component + "/cooling",
    method: "post",
    function: controller.CoolingSystem,
    private: false,
  },
];
export default routes;
