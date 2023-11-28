import { Request, Response } from "../../__types";
import { BaseController } from "../../core";

export default class HeatingCalculation extends BaseController {
  public __component: string = "heating";

  public HeatingSystem = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      // Balance equations for calculating the energy need for heating
      let Qhb = await this.calculateEnergyNeedForHeating(req.body);

      // Qh,ce are the control and emission thermal losses of the heating system
      let Qhce = await this.calculateControlAndEmissionLossesOfHeating(req.body)

      // Qh,d are the distribution thermal losses of the heating system
      let Qhd = await this.calculateDistributionLossesOfHeating(req.body)

      // Qh,s are the storage thermal losses of the heating system
      let Qhs = await this.calculateStorageLossOfHeating(req.body)

      // Qh,outg is the generator heat output to the heating system
      let Qhoutg = await this.calculateGeneratorHeatOutputToHeating(req.body)

      // Qh,g are the generation thermal losses of the heating system
      let Qhg = await this.calculateGenerationLossesOFHeating(req.body)

      // Qh,f is the delivered energy for the heat generator
      let Qhf = await this.calculateDeliveredEnergyForHeating(req.body)
      return this.json(
        res,
        200,
        {
          energy_need_for_heating: Qhb,
          monthly_control_emission_Loss: Qhce,
          distribution_loss_of_heating: Qhd,
          storage_loss_of_heating: Qhs,
          generated_heat_output_to_heating: Qhoutg,
          generation_loss_of_heating: Qhg,
          total_delivered_energy: Qhf
        },
        "Heating"
      )
    } catch (error) {
      return this.jsonError(res, 400, this.__component, "wrong", error)
    }
  }
}
