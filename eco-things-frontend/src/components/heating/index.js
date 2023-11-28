import React, { useState } from "react";
import Home from "../home";
import axios from "axios";
import Popup from "../popup";

const HeatingForm = () => {
  const [done, setDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(false);

  const [formData, setFormData] = useState({
    Rse: "",
    U: "",
    A: "",
    α: "",
    IS: "",
    Ff: "",
    ε: "",
    Geff: "",
    HTj: "",
    ϑi: "",
    ϑj: "",
    HVk: "",
    ϑk: "",
    QIp: "",
    AB: "",
    QIFac: "",
    c: "",
    m: "",
    ϑin: "",
    ϑout: "",
    QIw: "",
    QIh: "",
    QIvh: "",
    QIch: "",
    QIsourceL: "",
    QIvc: "",
    QIc: "",
    qIsinkFac: "",
    ηL1: "",
    ηL2: "",
    ηB1: "",
    ηB2: "",
    ηC: "",
    fRadiant: "",
    fInt: "",
    ϑNAGrenz: "",
    ϑe: "",
    ϑemin: "",
    thop: "",
    ϑWAGrenz: "",
    Dmth: "",
    dNutza: "",
    TH: "",
    Ui: "",
    ϑHKm: "",
    Li: "",
    ϑhs: "",
    Dhmth: "",
    qBS: "",
    Qhgvi: "",
    Qhreg: "",
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      axios
        .post("http://localhost:3000/api/heating/heating", formData)
        .then((response) => {
          setData(response.data);
          setDone(true);
          setFormData({
            Rse: "",
            U: "",
            A: "",
            α: "",
            IS: "",
            Ff: "",
            ε: "",
            Geff: "",
            HTj: "",
            ϑi: "",
            ϑj: "",
            HVk: "",
            ϑk: "",
            QIp: "",
            AB: "",
            QIFac: "",
            c: "",
            m: "",
            ϑin: "",
            ϑout: "",
            QIw: "",
            QIh: "",
            QIvh: "",
            QIch: "",
            QIsourceL: "",
            QIvc: "",
            QIc: "",
            qIsinkFac: "",
            ηL1: "",
            ηL2: "",
            ηB1: "",
            ηB2: "",
            ηC: "",
            fRadiant: "",
            fInt: "",
            ϑNAGrenz: "",
            ϑe: "",
            ϑemin: "",
            thop: "",
            ϑWAGrenz: "",
            Dmth: "",
            dNutza: "",
            TH: "",
            Ui: "",
            ϑHKm: "",
            Li: "",
            ϑhs: "",
            Dhmth: "",
            qBS: "",
            Qhgvi: "",
            Qhreg: "",
          });
        });
    }
  };

  return (
    <>
      <Home />
      <div className="container card card-body bg-light mt-4">
        {isOpen && (
          <Popup
            content={
              <>
                <b>Heating Calculation</b>
                {done ? (
                  <>
                    <div className="popup-container">
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Energy Need For Heating
                          </div>
                          <div className="col-6">
                            {data.data.energy_need_for_heating}
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Control And Emission Losses of Heating
                          </div>
                          <div className="col-6">
                            {data.data.monthly_control_emission_Loss}
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Distribution Losses of Heating
                          </div>
                          <div className="col-6">
                            {data.data.distribution_loss_of_heating}
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Storage Losses of Heating
                          </div>
                          <div className="col-6">
                            {data.data.storage_loss_of_heating}
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Generator Heat Output of Heating
                          </div>
                          <div className="col-6">
                            {data.data.generated_heat_output_to_heating}
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Generation Losses of Heating
                          </div>
                          <div className="col-6">
                            {data.data.generation_loss_of_heating}
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Delivered Energy for Heating
                          </div>
                          <div className="col-6">
                            {data.data.total_delivered_energy}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p>Loading.......</p>
                )}
              </>
            }
            handleClose={togglePopup}
          />
        )}
        <h3 className="text-success mb-2">Heating</h3>
        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Rse (external factor resistance)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, Rse: e.target.value })
                }
                value={formData.Rse}
                name="Rse"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                U (thermal transmittance of element)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, U: e.target.value })
                }
                value={formData.U}
                name="U"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                A (total area of element in specific orientation)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, A: e.target.value })
                }
                value={formData.A}
                name="A"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                α (solar radiation absorption coefficient)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, α: e.target.value })
                }
                value={formData.α}
                name="α"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                IS (global solar irradiance)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, IS: e.target.value })
                }
                value={formData.IS}
                name="IS"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Ff (form factor b/w building element and the sky)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, Ff: e.target.value })
                }
                value={formData.Ff}
                name="Ff"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ε (emissivity for thermal radiation of the external surface)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ε: e.target.value })
                }
                value={formData.ε}
                name="ε"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Geff (is the total energy transmittance)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, Geff: e.target.value })
                }
                value={formData.Geff}
                name="Geff"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                HTj (heat transfer coefficient b/t building zone & adjacent
                area)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, HTj: e.target.value })
                }
                value={formData.HTj}
                name="HTj"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ϑi (reference internal temperature of the building zone)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ϑi: e.target.value })
                }
                value={formData.ϑi}
                name="ϑi"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ϑj (average monthly external temperature of the building zone)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ϑj: e.target.value })
                }
                value={formData.ϑj}
                name="ϑj"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                HVk (heat transfer coefficient due to ventilation to external
                air)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, HVk: e.target.value })
                }
                value={formData.HVk}
                name="HVk"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ϑk (monthly average external temperature)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ϑk: e.target.value })
                }
                value={formData.ϑk}
                name="ϑk"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                QIp (specific mean daily heat dissipation by persons)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, QIp: e.target.value })
                }
                value={formData.QIp}
                name="QIp"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                AB (reference area of the building zone)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, AB: e.target.value })
                }
                value={formData.AB}
                name="AB"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                QIFac (specific mean daily heat dissipation by machinery and
                equipment)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, QIFac: e.target.value })
                }
                value={formData.QIFac}
                name="QIFac"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                c (specific heat capacity of the material being moved)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, c: e.target.value })
                }
                value={formData.c}
                name="c"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                m (mass transport rate of the material)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, m: e.target.value })
                }
                value={formData.m}
                name="m"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ϑin (mean temperature in the time interval)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ϑin: e.target.value })
                }
                value={formData.ϑin}
                name="ϑin"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ϑout (temperature of the material or goods leaving the building
                zone)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ϑout: e.target.value })
                }
                value={formData.ϑout}
                name="ϑout"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                QIw (uncontrolled heat input into zone due to domestic hot water
                system)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, QIw: e.target.value })
                }
                value={formData.QIw}
                name="QIw"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                QIh (uncontrolled heat input into the zone due to the heating
                system)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, QIh: e.target.value })
                }
                value={formData.QIh}
                name="QIh"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                QIvh (uncontrolled heat input into the zone due to mechanical
                ventilation)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, QIvh: e.target.value })
                }
                value={formData.QIvh}
                name="QIvh"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                QIch (uncontrolled heat input into zone due to cooling system
                generation)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, QIch: e.target.value })
                }
                value={formData.QIch}
                name="QIch"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                QIsourceL (heat input due to artificial lighting)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, QIsourceL: e.target.value })
                }
                value={formData.QIsourceL}
                name="QIsourceL"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                QIvc (uncontrolled cold input into the zone due to mechanical
                ventilation)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, QIvc: e.target.value })
                }
                value={formData.QIvc}
                name="QIvc"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                QIc (uncontrolled cold input into the zone due to the cooling
                system)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, QIc: e.target.value })
                }
                value={formData.QIc}
                name="QIc"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                qIsinkFac (specific mean daily cooling energy dissipated by
                refrigeration)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, qIsinkFac: e.target.value })
                }
                value={formData.qIsinkFac}
                name="qIsinkFac"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ηL1
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ηL1: e.target.value })
                }
                value={formData.ηL1}
                name="ηL1"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ηL2
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ηL2: e.target.value })
                }
                value={formData.ηL2}
                name="ηL2"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ηB1
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ηB1: e.target.value })
                }
                value={formData.ηB1}
                name="ηB1"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ηB2
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ηB2: e.target.value })
                }
                value={formData.ηB2}
                name="ηB2"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ηC (partial efficiency for room temperature control)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ηC: e.target.value })
                }
                value={formData.ηC}
                name="ηC"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                fRadiant (factor to account for the effect of radiation)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, fRadiant: e.target.value })
                }
                value={formData.fRadiant}
                name="fRadiant"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                fInt (factor to account for intermittent operation)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, fInt: e.target.value })
                }
                value={formData.fInt}
                name="fInt"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ϑNAGrenz (night-time set-back temperature limit of 10 °C)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ϑNAGrenz: e.target.value })
                }
                value={formData.ϑNAGrenz}
                name="ϑNAGrenz"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ϑe (monthly average outdoor temperature)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ϑe: e.target.value })
                }
                value={formData.ϑe}
                name="ϑe"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ϑemin (daily mean design temperature)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ϑemin: e.target.value })
                }
                value={formData.ϑemin}
                name="ϑemin"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                thop ( daily heating time, in h)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, thop: e.target.value })
                }
                value={formData.thop}
                name="thop"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ϑWAGrenz (weekend set-back temperature limit of 15 °C)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ϑWAGrenz: e.target.value })
                }
                value={formData.ϑWAGrenz}
                name="ϑWAGrenz"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Dmth (text of days per month, in d/mth)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, Dmth: e.target.value })
                }
                value={formData.Dmth}
                name="Dmth"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                dNutza (annual usage time in d)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, dNutza: e.target.value })
                }
                value={formData.dNutza}
                name="dNutza"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                TH (text of heating hours in the respective month in h)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, TH: e.target.value })
                }
                value={formData.TH}
                name="TH"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Ui (inear heat transfer coefficient, in W/m · K)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, Ui: e.target.value })
                }
                value={formData.Ui}
                name="Ui"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ϑHKm (mean heating medium temperature in °C)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ϑHKm: e.target.value })
                }
                value={formData.ϑHKm}
                name="ϑHKm"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Li (length of the piping, in m)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, Li: e.target.value })
                }
                value={formData.Li}
                name="Li"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ϑhs (mean temperature of the storage tank in °C)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ϑhs: e.target.value })
                }
                value={formData.ϑhs}
                name="ϑhs"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Dhmth (text of heating days)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, Dhmth: e.target.value })
                }
                value={formData.Dhmth}
                name="Dhmth"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                qBS (stand-by heat loss, in kWh/d)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, qBS: e.target.value })
                }
                value={formData.qBS}
                name="qBS"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Qhgvi (boiler heat loss, in kWh/d)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, Qhgvi: e.target.value })
                }
                value={formData.Qhgvi}
                name="Qhgvi"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Qhreg (quantity of regenerative energy used)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, Qhreg: e.target.value })
                }
                value={formData.Qhreg}
                name="Qhreg"
              />
            </div>
            <div className="text-center w-100 mt-3">
              <button
                type="button"
                className="btn btn-outline-success w-25"
                onClick={togglePopup}
              >
                Calculate
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default HeatingForm;
