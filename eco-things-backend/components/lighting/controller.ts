import { Request, Response } from '../../__types';
import { BaseController } from '../../core';


export default class LightingCalculation extends BaseController {
  public __component: string = "lighting";
  public LightingSystem = async (req: Request, res: Response): Promise<Response> => {
    try {
      let Qlf = this.calculateEnergyNeedForLighting(req.body)
    
      return this.json(res, 200, {energy_need_for_lighting: Qlf}, "lighting",)
    } catch (error) {
      return this.jsonError(res, 400, this.__component, "wrong", error)
    }
  }
}