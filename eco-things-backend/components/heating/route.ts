import { route } from "../../__types";
import HeatingCalculation from "./controller";
const controller: HeatingCalculation = new HeatingCalculation();

const routes: route[] = [
  {
    path: controller.__component + "/heating",
    method: "post",
    function: controller.HeatingSystem,
    private: false,
  },
];
export default routes;
