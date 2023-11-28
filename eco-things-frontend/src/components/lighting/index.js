import React, { useState } from "react";
import Home from "../home";
import axios from "axios";
import Popup from "../popup";

const LightingForm = () => {
  const [done, setDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(false);

  const [formData, setFormData] = useState({
    PjLx: "",
    Em: "",
    KA: "",
    KL: "",
    KR: "",
    aTL: "",
    bTL: "",
    CAJ: "",
    CPraKonJ: "",
    tTagN: "",
    tTLSNAj: "",
    tTagJ: "",
    CTLVersSNAj: "",
    CTLVersSAj: "",
    CTLKonJ: "",
    teffNachtn: "",
    AKTLj: "",
    FTn: "",
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      axios
        .post("http://localhost:3000/api/lighting/lighting", formData)
        .then((response) => {
          setData(response.data);
          setDone(true);
          setFormData({
            PjLx: "",
            Em: "",
            KA: "",
            KL: "",
            KR: "",
            aTL: "",
            bTL: "",
            CAJ: "",
            CPraKonJ: "",
            tTagN: "",
            tTLSNAj: "",
            tTagJ: "",
            CTLVersSNAj: "",
            CTLVersSAj: "",
            CTLKonJ: "",
            teffNachtn: "",
            AKTLj: "",
            FTn: "",
          });
        });
    }
    // axios
    //   .get("https://jsonplaceholder.typicode.com/todos/1")
    //   .then(function(response) {
    //     // handle success
    //     setData(response);
    //     console.log(response);
    //     setDone(true);
    //   });
  };

  return (
    <>
      <Home />
      <div className="container card card-body bg-light mt-4">
        {isOpen && (
          <Popup
            content={
              <>
                <b>Lighting Calculation</b>
                {done ? (
                  <>
                    <div className="popup-container">
                      <div className="item">
                        <div className="row">
                          <div className="col-6 fw-bold">
                          Energy Need For Lighting
                          </div>
                          <div className="col-6">
                          {data.data.energy_need_for_lighting}
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
        <h3 className="text-success mb-2">Lighting</h3>
        <form>
          <div className="row">
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                PjLx
              </label>
              <input
                type="number"
                class="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, PjLx: e.target.value })
                }
                value={formData.PjLx}
                name="PjLx"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                Em (maintained illuminance)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, Em: e.target.value })
                }
                value={formData.Em}
                name="Em"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                KA (reduction factor)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, KA: e.target.value })
                }
                value={formData.KA}
                name="KA"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                KL (correction factor in type of lamp)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, KL: e.target.value })
                }
                value={formData.KL}
                name="KL"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                KR (correction factor in type of space)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, KR: e.target.value })
                }
                value={formData.KR}
                name="KR"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                aTL (depth of daylight area)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, aTL: e.target.value })
                }
                value={formData.aTL}
                name="aTL"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                bTL (width of daylight area)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, bTL: e.target.value })
                }
                value={formData.bTL}
                name="bTL"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                CAJ (# of absentees in evaluation area)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, CAJ: e.target.value })
                }
                value={formData.CAJ}
                name="CAJ"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                CPraKonJ (factor describing efficiency)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, CPraKonJ: e.target.value })
                }
                value={formData.CPraKonJ}
                name="CPraKonJ"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                tTagN (operating time of zone N during daytime)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, tTagN: e.target.value })
                }
                value={formData.tTagN}
                name="tTagN"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                tTLSNAj (time during solar-radiation not active)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, tTLSNAj: e.target.value })
                }
                value={formData.tTLSNAj}
                name="tTLSNAj"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                tTagJ
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, tTagJ: e.target.value })
                }
                value={formData.tTagJ}
                name="tTagJ"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                CTLVersSNAj (daylight supply factor)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, CTLVersSNAj: e.target.value })
                }
                value={formData.CTLVersSNAj}
                name="CTLVersSNAj"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                CTLVersSAj (factor solar-radiation is activated)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, CTLVersSAj: e.target.value })
                }
                value={formData.CTLVersSAj}
                name="CTLVersSAj"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                CTLKonJ (factor representing daylight lighting)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, CTLKonJ: e.target.value })
                }
                value={formData.CTLKonJ}
                name="CTLKonJ"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                teffNachtn (operating time of zone N nighttime)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, teffNachtn: e.target.value })
                }
                value={formData.teffNachtn}
                name="teffNachtn"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                AKTLj (part of area not illuminated by daylight)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, AKTLj: e.target.value })
                }
                value={formData.AKTLj}
                name="AKTLj"
              />
            </div>
            <div className="col-md-4 mb-1">
              <label for="exampleFormControlInput1" className="form-label">
                FTn (partial operation factor)
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setFormData({ ...formData, FTn: e.target.value })
                }
                value={formData.FTn}
                name="FTn"
              />
            </div>
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
        </form>
      </div>
    </>
  );
};

export default LightingForm;
