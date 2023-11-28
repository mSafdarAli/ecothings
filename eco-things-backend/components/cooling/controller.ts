import { Request, Response } from "../../__types";
import { BaseController } from "../../core";

export default class CoolingCalculation extends BaseController {
  public __component: string = "cooling";
  public CoolingSystem = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      // QSource is the sum of heat flows due to heat sources in the building zone under the given boundary conditions
      // let Qcb = (1 - η) * QSource
      let Qcb = await this.calculateEnergyNeedForCooling(req.body)

      // The monthly energy need for heating monthly energy need for cooling
      // For residential buildings and buildings with continuous operation
      // dmth is the number of days in the month
      // Qc,b is the balanced energy need of the building zone for cooling
      let Qcbmth = req.body.Dmth * Qcb

      // Qc,ce cooling energy loss of control and emission for the room conditioning system
      let QCCe = await this.calculateControlAndEmissionLossesOfCooling(req.body)

      // Qc,d is the cooling energy loss of distribution for the cooling system
      let Qcd = await this.calculateDistributionLossesOfCooling(req.body)

      // Qc,s is the cooling energy loss of storage for the room conditioning system
      let Qcs = 0

      // Qc,outg is the generator cooling energy output to the cooling system
      let Qcoutg = await this.calculateGeneratorCoolingEnergyOutputToCooling(
        req.body
      )

      // Qc,g is the generation loss of the cooling system
      let Qcg = 0

      // Qc,f is the delivered energy for the cold generator
      let Qcf = await this.calculateDeliveredEnergyForCooling(req.body);

      return this.json(
        res,
        200,
        {
          energy_need_for_cooling: Qcb,
          monthly_energy_need_for_cooling: Qcbmth,
          control_and_emission_Loss_of_cooling: QCCe,
          distribution_losses_of_cooling: Qcd,
          storage_loss_of_cooling: Qcs,
          generated_cooling_output_to_cooling: Qcoutg,
          generation_loss_of_cooling: Qcg,
          delivered_energy_for_cooling: Qcf
        },
        "Cooling"
      )
    } catch (error) {
      return this.jsonError(res, 400, this.__component, "wrong", error)
    }
  };


  // public deliveredEnergyForCooling = async (req: Request, res: Response): Promise<Response> => {
  //   try {
  //     let Qcf = this.calculateDeliveredEnergyForCooling(req.body)
  //     return this.json(res, 200, { delivered_energy_for_cooling: Qcf}, "calculated")
  //   } catch (error) {
  //     return this.jsonError(res, 400, this.__component, "wrong", error)
  //   }
  // }
}
