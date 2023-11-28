import React, { useState } from "react";
import Home from "../home";
import axios from "axios";
import Popup from "../popup";
import "./style.css";

const CoolingForm = () => {
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
    η: "",
    ηCCe: "",
    ηCCeSens: "",
    ηcd: "",
    Dmth: "",
    QcReg: "",
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      axios
        .post("http://localhost:3000/api/cooling/cooling", formData)
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
            η: "",
            ηCCe: "",
            ηCCeSens: "",
            ηcd: "",
            Dmth: "",
            QcReg: "",
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
              <b>Cooling Calculation</b>
                {done ? (
                  <>
                    <div className="popup-container">
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Energy Need For Cooling{" "}
                          </div>
                          <div className="col-6">
                            {data.data.energy_need_for_cooling}
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Control And Emission Losses of Cooling
                          </div>
                          <div className="col-6">
                            {data.data.control_and_emission_Loss_of_cooling}
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Distribution Losses of Cooling
                          </div>
                          <div className="col-6">
                            {data.data.distribution_losses_of_cooling}
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Storage Losses of Cooling
                          </div>
                          <div className="col-6">
                            {data.data.storage_loss_of_cooling}
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Generator Cooling Energy Output of Cooling
                          </div>
                          <div className="col-6">
                            {data.data.generated_cooling_output_to_cooling}
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Generation Losses of Cooling
                          </div>
                          <div className="col-6">
                            {data.data.generation_loss_of_cooling}
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                            Delivered Energy for Cooling
                          </div>
                          <div className="col-6">
                            {data.data.delivered_energy_for_cooling}
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
        <h3 className="text-success mb-2">Cooling</h3>
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
                η (utilization factor of the heat sources)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, η: e.target.value })
                }
                value={formData.η}
                name="η"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ηCCe (efficiency of control and emission of cooling)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ηCCe: e.target.value })
                }
                value={formData.ηCCe}
                name="ηCCe"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ηCCeSens (sensible efficiency of control and emission)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ηCCeSens: e.target.value })
                }
                value={formData.ηCCeSens}
                name="ηCCeSens"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                ηcd (efficiency of the distribution)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, ηcd: e.target.value })
                }
                value={formData.ηcd}
                name="ηcd"
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
                QcReg (quantity of regenerative energy used)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, QcReg: e.target.value })
                }
                value={formData.QcReg}
                name="QcReg"
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

export default CoolingForm;
