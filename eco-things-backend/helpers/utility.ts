import moment from "moment";
import fs from "fs";
import config from "../config/config";
import Validator from "validatorjs";
const saltedSha256 = require("salted-sha256");
export default class Utility {
  public static dir = (path): Promise<string> => {
    const dest = global["appRoot"] + global["config"].uploads.path + path;
    fs.mkdirSync(dest, { recursive: true });
    return dest;
  };
  public async uploadFile(file, types: string[], path, extraVar = "") {
    if (file) {
      const originalFileName = file.originalname.split(".");
      const ext = originalFileName[originalFileName.length - 1];
      if (types.indexOf(ext) === -1) {
        return null;
      }
      const dest = await Utility.dir(path);
      const fileName =
        (extraVar ? extraVar + "_" : "") +
        this.randomString(10) +
        moment().format("x") +
        "." +
        ext;
      fs.renameSync(file.path, dest + fileName);
      return global["config"].uploads.path + path + fileName;
    }
  }
  public deleteFile(path) {
    const fullpath = global["appRoot"] + global["config"].uploads.path + path;
    if (fs.existsSync(fullpath)) {
      fs.unlinkSync(fullpath);
    }
  }
  public trim = (s, c = " ") => {
    if (s) {
      if (c === "]") {
        c = "\\]";
      }
      if (c === "\\") {
        c = "\\\\";
      }
      return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
    }
    return s;
  };
  public uploadBase64File = (base64Image, dir, extraVar = "") => {
    base64Image = base64Image.split(";base64,");
    let filePath;
    if (base64Image.length === 2) {
      const ext = base64Image[0].split("/").pop();
      const dest = Utility.dir(dir);
      const fileName =
        (extraVar ? extraVar + "_" : "") +
        this.randomString(10) +
        moment().format("x") +
        "." +
        ext;
      filePath = global["config"].uploads.path + dir + fileName;
      fs.writeFileSync(dest + fileName, base64Image[1], { encoding: "base64" });
    } else {
      filePath = base64Image[0];
    }
    return filePath;
  };
  public randomString = (length, noOnly = false): string => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if (noOnly) {
      characters = "0123456789";
    }
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  protected salt = (): string => {
    const numberPart = Math.floor(Math.random() * 9) + 1;
    const firstString =
      this.randomString(39 - numberPart) + this.randomString(numberPart, true);
    const number = Math.floor(Math.random() * 30) + 10;
    const secondString =
      this.randomString(numberPart, true) + this.randomString(39 - numberPart);
    return firstString + number + secondString;
  };

  private secretSalt = (salt: string): string => {
    const saltN = parseInt(salt.substr(39, 41));
    return config.secret.substr(saltN, 100);
  };

  public passwordEn = (
    password: string,
    salt?: string
  ): { password: string; salt: string } => {
    const RO = { password: "", salt: "" };
    if (!salt) {
      salt = this.salt();
    }
    RO.salt = salt;
    const enpass = saltedSha256(password, salt);
    RO.password = saltedSha256(enpass, this.secretSalt(salt));
    return RO;
  };
  public validateForm = (
    FormBody,
    Validationrules
  ): Promise<boolean | object> => {
    const validator = new Validator(FormBody, Validationrules);
    return new Promise((resolve) => {
      function passes() {
        resolve(false);
      }

      function fails() {
        resolve(validator.errors.all());
      }

      validator.checkAsync(passes, fails);
    });
  };
  public getFormFields = (FormBody: Object, Validationrules: Object): any => {
    const res = {};
    Object.keys(Validationrules).forEach((key) => {
      res[key] = FormBody[key];
    });
    return res;
  };

  // lighting
  public calculateEnergyNeedForLighting = (body) => {
    // Em: is the maintained illuminance in accordance
    // kA: is the reduction factor to account for the proportion of the task area
    // kL: is the correction factor taking into account the type of lamp
    // kR: is the correction factor taking into account the type of space.
    let Pj =
      parseFloat(body.PjLx) *
      parseFloat(body.Em) *
      parseFloat(body.KA) *
      parseFloat(body.KL) *
      parseFloat(body.KR);

    //a TL : is the depth of the daylight area
    //b TL : is the width of the daylight area
    let ATLj = parseFloat(body.aTL) * parseFloat(body.bTL);

    //CA,j: is the relative number of absentees in the evaluation area j.
    let FPraj = 1 - parseFloat(body.CAJ) * parseFloat(body.CPraKonJ);

    //t eff,Tag, KTL,j : is the effective operating time of the lighting system,
    // during the day-time, in area j which Is not illuminated by daylight
    let teffTagKTLj = parseFloat(body.tTagN) * FPraj;

    //CTL,Vers,j: is the daylight supply factor
    // CTL,Vers,SNA,j is the daylight supply factor of the evaluation area j at times
    // when the solar radiation and/or glare protection system is not activated,
    // CTL,Vers,SA,j is the daylight supply factor of the evaluation area j at times
    // when the solar radiation and/or glare protection system is activated,
    let CTLVersj =
      (parseFloat(body.tTLSNAj) / parseFloat(body.tTagJ)) *
        parseFloat(body.CTLVersSNAj) +
      (parseFloat(body.tTLSNAj) / parseFloat(body.tTagJ)) *
        parseFloat(body.CTLVersSAj);

    // FTL,j : is the partial-operation factor to account for illumination by daylight in the evaluation area j.
    // CTL,kon,j: is the factor representing the effect of the daylight-responsive lighting control system
    let FTLj = 1 - CTLVersj * parseFloat(body.CTLKonJ);

    //FTL,j : is the partial-operation factor to account for illumination by daylight in the evaluation area j.
    let teffTagTLj = parseFloat(body.tTagN) * FTLj * FPraj;

    // teff,Nacht,j is the effective operating time of the lighting system, during the
    // night-time, in area j
    let teffNachtj = parseFloat(body.teffNachtn) * FPraj;

    // Pj: is the specific electrical evaluation power of area j
    // ATL,j : is that part of area j which is illuminated by daylight
    // AKTL,j : is that part of area j which is not illuminated by daylight = ?
    let Q1bnj =
      Pj *
      (ATLj * (teffTagTLj + teffNachtj) +
        parseFloat(body.AKTLj) * (teffTagKTLj + teffNachtj));

    let Qlf = parseFloat(body.FTn) * Q1bnj;
    return Qlf;
  };

  public calculateQSource = (body): any => {
    let values = {
      HTj: parseFloat(body.HTj),
      HTD: parseFloat(body.HTD),
      HTiu: parseFloat(body.HTiu),
      HTiz: parseFloat(body.HTiz),
      HTs: parseFloat(body.HTs),
      HVk: parseFloat(body.HVk),
      HVinf: parseFloat(body.HVinf),
      HVwin: parseFloat(body.HVwin),
      HVmech: parseFloat(body.HVmech),
      ϑVmech: parseFloat(body.ϑVmech),
      HVz: parseFloat(body.HVz),
      AB: parseFloat(body.AB),
      ϑe: parseFloat(body.ϑe),
      ϑi: parseFloat(body.ϑi),
      ϑj: parseFloat(body.ϑj),
      ϑk: parseFloat(body.ϑk),
      ϑu: parseFloat(body.ϑu),
      ϑz: parseFloat(body.ϑz),
      A: parseFloat(body.A),
      IS: parseFloat(body.IS),
      t: 24,
      a: parseFloat(body.α), // this is not 'a'  this is a sign 'α'
      FS: parseFloat(body.FS),
      Fw: parseFloat(body.FW),
      FV: parseFloat(body.FV),
      gT: parseFloat(body.gT), //this is not 'gt' this is a sign 'g⊥'
      gtot: parseFloat(body.gtot),
      qIp: parseFloat(body.QIp),
      q1Fac: parseFloat(body.QIFac),
      QIsourceL: parseFloat(body.QIsourceL),
      ε: parseFloat(body.ε),
      QSop: {
        Rse: parseFloat(body.Rse),
        U: parseFloat(body.U),
        Ff: parseFloat(body.Ff),
        Δϑer: 10000,
      },
      QStr: {
        FF: 0.7,
        geff: parseFloat(body.Geff),
      },
      QIsourceGoods: {
        c: parseFloat(body.c),
        m: parseFloat(body.m),
        ϑin: parseFloat(body.ϑin),
        ϑout: parseFloat(body.ϑout),
      },
      QIsourceH: {
        QIw: parseFloat(body.QIw),
        QIh: parseFloat(body.QIh),
        QIvh: parseFloat(body.QIvh),
        QIch: parseFloat(body.QIch),
      },
    };

    // ε is the emissivity for thermal radiation of the external surface. If the values are not known,
    // ε shall be assumed to be equal to 0,9.
    let hr = 5 * values.ε ? values.ε : 0.9; //in W/(m 2 · K)

    // Rse is the external surface resistance
    // U is the thermal transmittance of the element
    // A is the total area of the element in a specific orientation
    // α is the solar radiation absorption coefficient of the element
    // IS is the global solar irradiance for the orientation of the element surface
    // Ff is the form factor for the relationship between the building element and the sky
    // hr is the external radiative heat transfer coefficient obtained
    // Δϑer is the mean difference between the temperature of the ambient air and the apparent sky temperature; for simplified calculations Δϑ er can be assumed to be 10K
    // t is the calculation period (t = 24 h)
    // Note ----- (a * IS) > (Ff * hr * Δϑer)
    let QSop =
      values.QSop.Rse *
      values.QSop.U *
      values.A *
      (values.a * values.IS -
        values.QSop.Ff * hr * values.QSop.Δϑer * values.t);

    // no solar protection formula where
    // FS is the shading correction factor to account for shading by the surroundings
    // Fw is the correction factor due to oblique incidence of radiation, equal to 0,9
    // FV is the dirt depreciation factor
    // g⊥/gT is the total energy transmittance of the glazing (without solar protection)
    // g tot is the total energy transmittance taking into consideration the solar protection device
      values.FS * values.Fw * values.FV * values.gT;

    //fixed solar protection provide
    // FF is the frame factor, corresponding to the ratio of the transparent area to the total area of the element; in the absence of precise data, FF shall be assumed to be 0.7
    // A is the total area of the element
    // geff is the effective total energy transmittance
    // IS is the mean solar irradiance for the entire month
    // t is the period to which the calculation step applies ( t = 24 h)
    let QStr =
      values.QStr.FF * values.A * values.QStr.geff * values.IS * values.t;

    // QS,tr is the sum of heat gains due to solar radiation through transparent building elements
    // QS,op is the sum of the heat gains due to solar radiation on opaque surfaces
    let QS = QStr + QSop;

    // HT,j is the heat transfer coefficient between the building zone and an adjacent area
    // ϑi is the reference internal temperature of the building zone
    // ϑj is the average monthly external temperature or the mean temperature of the adjacent building zone
    // t is the period to which the calculation step applies (t = 24 h)
    let QT = values.HTj * (values.ϑj - values.ϑi) * values.t; // for ϑi < ϑj

    // Transmission through external building elements

    // Transmission from adjacent unheated building zones or sunspaces

    // Transmission from adjacent heated or cooled building zones

    // Transmission through the ground

    // Ventilation heat sources
    // HV,k is the heat transfer coefficient due to ventilation to external air, air in another building zone,
    // ϑi is the reference internal temperature of the building zone
    // ϑ k is the monthly average external temperature or the mean temperature of the supply air from the ventilation system or from another building zone
    // t is the calculation period
    let QV = values.HVk * (values.ϑk - values.ϑi) * values.t; // for ϑi < ϑk

    // Ventilation heat sources due to external air infiltration

    // Ventilation heat sources due to window airing

    // Heat sources due to mechanical ventilation

    // Ventilation heat sources due to air exchange with other zones

    // qI,p is the specific mean daily heat dissipation by persons, in relation to the reference area
    // AB is the reference area of the building zone.
    let QIsourceP = values.qIp * values.AB;

    // qI,fac is the specific mean daily heat dissipation by machinery and equipment, in relation to the reference area
    // AB is same as above
    let QIsourceFac = values.q1Fac * values.AB;

    // c is the specific heat capacity of the material being moved
    // m is the mass transport rate of the material ( m =m/24 whereby m is the mean mass of material transported in a 24 h period)
    // ϑin is the mean temperature in the time interval at which the material, goods etc. are brought into the building zone
    // ϑout is the temperature of the material or goods leaving the building zone (if not otherwise known, the internal temperature ϑi )
    // t is same as above
    let QIsourceGoods =
      values.QIsourceGoods.c *
      (values.QIsourceGoods.m / 24) *
      (values.QIsourceGoods.ϑin - values.QIsourceGoods.ϑout) *
      values.t; // for ϑin > ϑout

    // QI,w is the uncontrolled heat input into the zone due to the domestic hot water system
    // QI,h is the uncontrolled heat input into the zone due to the heating system
    // QI,vh is the uncontrolled heat input into the zone due to mechanical ventilation
    // QI,ch is the uncontrolled heat input into the zone due to the cooling system/cold generation
    let QIsourceH =
      values.QIsourceH.QIw +
      values.QIsourceH.QIh +
      values.QIsourceH.QIvh +
      values.QIsourceH.QIch;

    // QI,source,p is the heat input due to persons
    // QI,source,L is the heat input due to artificial lighting
    // QI,source,fac is the heat input due to equipment, machinery or other appliances
    // QI,source,goods is the heat input due to material, goods and objects brought into the building zone and which have temperatures above the reference internal temperature,
    // QI,source,h is the heat input due to heating and cooling systems
    let QIsource =
      QIsourceP + values.QIsourceL + QIsourceFac + QIsourceGoods + QIsourceH;

    // QS is the sum of heat flows due to solar radiation
    // QT is the sum of heat flows due to transmission heat sources
    // QV is the sum of heat flows due to ventilation heat sources
    // QI,source is the sum of heat flows due to internal heat sources in the building zone
    let QSource = QS + QT + QV + QIsource;
    return QSource;
  };

  public calculateQSink = (body): any => {
    let values = {
      HTj: parseFloat(body.HTj),
      HTD: parseFloat(body.HTD),
      HTiu: parseFloat(body.HTiu),
      HTiz: parseFloat(body.HTiz),
      HTs: parseFloat(body.HTs),
      HVk: parseFloat(body.HVk),
      HVinf: parseFloat(body.HVinf),
      HVwin: parseFloat(body.HVwin),
      HVmech: parseFloat(body.HVmech),
      ϑVmech: parseFloat(body.ϑVmech),
      HVz: parseFloat(body.HVz),
      AB: parseFloat(body.AB),
      ϑe: parseFloat(body.ϑe),
      ϑi: parseFloat(body.ϑi),
      ϑj: parseFloat(body.ϑj),
      ϑk: parseFloat(body.ϑk),
      ϑu: parseFloat(body.ϑu),
      ϑz: parseFloat(body.ϑz),
      A: parseFloat(body.A),
      IS: parseFloat(body.IS),
      t: 24,
      a: parseFloat(body.α), // this is not 'a'  this is a sign 'α'
      ε: parseFloat(body.ε),
      QIsinkC: {
        QIvc: parseFloat(body.QIvc),
        QIc: parseFloat(body.QIc),
      },
      QIsinkFac: {
        qIsinkFac: parseFloat(body.qIsinkFac),
      },
      QIsinkGoods: {
        c: parseFloat(body.c),
        m: parseFloat(body.m),
        ϑin: parseFloat(body.ϑin),
        ϑout: parseFloat(body.ϑout),
      },
      QSop: {
        Rse: parseFloat(body.Rse),
        U: parseFloat(body.U),
        Ff: parseFloat(body.Ff),
        hr: parseFloat(body.hr),
        Δϑer: 10000,
      },
      QStr: {
        FF: 0.7,
        geff: parseFloat(body.Geff),
      },
      ΔQCsink: 0,
    };
    let QT = values.HTj * (values.ϑi - values.ϑj) * values.t; // for ϑi < ϑj

    // transmission through external building elements

    // transmission to adjacent unheated building zones or sunspaces

    // transmission to adjacent heated or cooled building zones

    // transmission to the ground

    // Ventilation heat sinks
    let QV = values.HVk * (values.ϑi - values.ϑk) * values.t; // for ϑi < ϑk

    // Ventilation heat sinks due to external air infiltration

    // Ventilation heat sinks due to window airing

    // Cold gains due to mechanical ventilation

    // Ventilation heat sinks due to air exchange with other zones

    // QI,vc is the uncontrolled cold input into the zone due to mechanical ventilation
    // QI,c is the uncontrolled cold input into the zone due to the cooling system/cold generation
    let QIsinkC = values.QIsinkC.QIvc + values.QIsinkC.QIc;

    // qI,sink,fac is the specific mean daily cooling energy dissipated by refrigeration appliances with refrigeration units outside the building zone, in relation to the reference area
    // AB is the reference area of the building zone
    let QIsinkFac = values.QIsinkFac.qIsinkFac * values.AB;

    // c is the specific heat capacity of the material being moved
    // m is the mass transport rate of the material ( m=m/24 whereby m is the mean mass of material transported in a 24 h period)
    // ϑin is the mean temperature in the time interval at which the material, goods etc. are brought into the building zone
    // ϑout is the temperature of the material or goods leaving the building zone
    // t is the length of the calculation step (t = 24 h).
    let QIsinkGoods =
      values.QIsinkGoods.c *
      values.QIsinkGoods.m *
      (values.QIsinkGoods.ϑout - values.QIsinkGoods.ϑin) *
      values.t; // for ϑin < ϑout

    let QISink = QIsinkC + QIsinkFac + QIsinkGoods;

    // ε is the emissivity for thermal radiation of the external surface. If the values are not known,
    // ε shall be assumed to be equal to 0,9.
    let hr = 5 * values.ε ? values.ε : 0.9; //in W/(m 2 · K)

    // α is the solar radiation absorption coefficient of the element
    let QSop =
      values.QSop.Rse *
      values.QSop.U *
      values.A *
      (values.QSop.Ff * hr * values.QSop.Δϑer -
        values.a * values.IS * values.t);
    let QStr =
      values.QStr.FF * values.A * values.QStr.geff * values.IS * values.t;
    let QS = QStr + QSop;

    // QT is the heat flow due to transmission heat sinks
    // QV is the heat flow due to ventilation heat sinks
    // QI,sink is the heat flow due to internal heat sinks in the building zone
    // QS is the heat flow due to radiative heat transfer, taking into account incident solar radiation
    // ΔQC,sink is the heat stored during periods of normal operation that escapes from the elements during days with reduced operation
    let QSink = QT + QV + QISink + QS + values.ΔQCsink;
    return QSink;
  };

  // heating
  public calculateEnergyNeedForHeating = async (body): Promise<any> => {
    // Qsink is the sum of the heat sinks in the building zone under the given boundary conditions
    // Qsource is the sum of the heat sources in the building zone under the given boundary conditions
    // ΔQC,b is the heat escaping from building elements during periods of reduced operation at weekends and during holiday periods
    // ΔQC,b = 0 for continuous operation
    // η is the monthly utilization factor of the heat sources (for heating purposes), calculated according to 5.5
    let ΔQCb = 0;
    const qSource = await this.calculateQSource(body);
    const qSink = await this.calculateQSink(body);
    let η = qSource / qSink;
    let Qhb = qSink - η * qSource - ΔQCb;
    return Qhb;
  };

  public calculateControlAndEmissionLossesOfHeating = async (
    body
  ): Promise<any> => {
    let ηL = (parseFloat(body.ηL1) + parseFloat(body.ηL2)) / 2;
    let ηB = (parseFloat(body.ηB1) + parseFloat(body.ηB2)) / 2;
    // ηL is the partial efficiency for a vertical air temperature profile
    // ηC is the partial efficiency for room temperature control
    // ηB is the partial efficiency for specific thermal losses via external components
    let ηhce = 1 / (4 - (ηL + parseFloat(body.ηC) + ηB));

    // Qh,ce is the additional loss due to control and emission (in the respective month), in kWh
    // Qh,b is the energy need (in the respective month) in kWh
    // fRadiant is the factor to account for the effect of radiation (only relevant when heating large indoor spaces where h > 4 m)
    // fint is the factor to account for intermittent operation
    // fhydr is the factor to account for hydraulic balance, currently equal to 1
    // ηh,ce is the overall efficiency for heat emission in the room.
    // ----------------NOTE----------------------
    // fint and fRadiant shall be set at 1, unless described in more detail in the following clauses
    const energyNeedForHeating = await this.calculateEnergyNeedForHeating(body);
    let fhydr = 1;
    let Qhce =
      ((parseFloat(body.fRadiant) * parseFloat(body.fInt) * fhydr) / ηhce - 1) *
      energyNeedForHeating;
    return Qhce;
  };

  public calculateDistributionLossesOfHeating = (body) => {
    // Qh,d = ∑ Ui ⋅ ( ϑHK,m − ϑi ) ⋅ Li ⋅ thrLi

    // ϑNA,Grenz is the night-time set-back temperature limit of 10 °C
    // ϑe is the monthly average outdoor temperature (see 4.1), in °C
    // ϑe,min is the daily mean design temperature (see 4.1), in °C.
    let fLNA =
      1 -
      (parseFloat(body.ϑNAGrenz) - parseFloat(body.ϑe)) /
        (parseFloat(body.ϑNAGrenz) - parseFloat(body.ϑemin)); // with fL,NA ≤ 1
    // fL,NA is the running time factor for night-time set-back or switch-off
    // th,op is the daily heating time, in h
    let thrLT = (24 - fLNA) * (24 - parseFloat(body.thop));

    // ϑWA,Grenz is the weekend set-back temperature limit of 15 °C
    let fLWA =
      1 -
      (parseFloat(body.ϑWAGrenz) - parseFloat(body.ϑe)) /
        (parseFloat(body.ϑWAGrenz) - parseFloat(body.ϑemin)); // with f L,WA ≤ 1

    // dmth Number of days per month, in d/mth
    // fL,WA is the factor taking into account weekend set-back or switch-off
    // dNutz,a is the annual usage time in d
    // th is the number of heating hours in the respective month (see 4.1), in h
    let dhrB =
      body.Dmth *
      (((365 - fLWA) * (365 - parseFloat(body.dNutza))) / 365) *
      (parseFloat(body.TH) / (body.Dmth * 24));

    // th,rL,T is the daily design running time, in h
    // dh,rB is the monthly design number of operating days
    let thrL = thrLT * dhrB;
    // Qh,d is the heat output from distribution piping (in the respective month), in kWh.
    // Ui is the linear heat transfer coefficient, in W/m · K
    // ϑHK,m is the mean heating medium temperature from 5.4, in °C
    // ϑi is the ambient temperature (see 4.1 or Table 15), in °C
    // L is the length of the piping, in m
    // th,rL is the monthly design running time (see 5.4.1), in h
    let Qhd =
      parseFloat(body.Ui) *
      (parseFloat(body.ϑHKm) - parseFloat(body.ϑi)) *
      parseFloat(body.Li) *
      thrL;
    return Qhd;
  };

  public calculateStorageLossOfHeating = (body) => {
    // Qh,s = fVerbindung ⋅ ( ϑh,s − ϑi ) ⋅ dh,mth ⋅ qB,S

    // Qh,s is the heat loss of the storage tank (in the respective month) (see 4.2), in kWh
    // ϑh,s is the mean temperature of the storage tank (see clause 5), in °C
    // ϑi is the average ambient temperature (see 4.1 or Table 15), in °C
    // dh,mth is the number of heating days (in the respective month) (see 4.1)
    // qB,S is the stand-by heat loss, in kWh/d
    const fVerbindung = 1.2;
    let Qhs =
      fVerbindung *
      ((parseFloat(body.ϑhs) - parseFloat(body.ϑi)) / 45) *
      (parseFloat(body.Dhmth) * parseFloat(body.qBS));
    return Qhs;
  };

  public calculateGeneratorHeatOutputToHeating = async (body) => {
    // Qh,outg is the generator heat output to the heating distribution system
    // Qh,b,i is the energy need for heating
    // Qh,ce is the control and emission loss of the heating system
    // Qh,d is the distribution loss of the heating system
    // Qh,s is the storage loss of the heating system
    const energyNeedForHeating = await this.calculateEnergyNeedForHeating(body);
    const controlAndEmissionLossesOfHeating =
      await this.calculateControlAndEmissionLossesOfHeating(body);
    const distributionLossesOfHeating =
      await this.calculateDistributionLossesOfHeating(body);
    const storageLossOfHeating = await this.calculateStorageLossOfHeating(body);
    let Qhoutg =
      energyNeedForHeating +
      controlAndEmissionLossesOfHeating +
      distributionLossesOfHeating +
      storageLossOfHeating;
    return Qhoutg;
  };

  public calculateGenerationLossesOFHeating = (body) => {
    // Qh,g = Σ(Qh,g,v,i · dh,rB)

    // ϑWA,Grenz is the weekend set-back temperature limit of 15 °C
    let fLWA =
      1 -
      (parseFloat(body.ϑWAGrenz) - parseFloat(body.ϑe)) /
        (parseFloat(body.ϑWAGrenz) - parseFloat(body.ϑemin)); // with f L,WA ≤ 1
    // dh,rB is the design number of operating days in the respective month
    // dmth is the number of days in the respective month
    // fL,WA is the factor taking into account weekend set-back or switch-off
    // for continuous operation over the weekend: fL,WA = 0
    // dNutz,a is the annual usage time in days
    // th is the number of heating hours in the respective month in h
    let dhrB =
      body.Dmth *
      (((365 - fLWA) * (365 - parseFloat(body.dNutza))) / 365) *
      (parseFloat(body.TH) / (body.Dmth * 24));

    // Qh,g is the total generation loss of the heating system (in the respective month) in kWh
    // Qh,g,v,i is the boiler heat loss, in kWh/d
    // dh,rB is the design number of operating days (in the respective month), in days
    let Qhg = parseFloat(body.Qhgvi) * dhrB;
    return Qhg;
  };

  public calculateDeliveredEnergyForHeating = async (body) => {
    // Qh,f is the delivered energy for the heat generator
    // Qh,outg is the generator heat output to the heating system
    // Qh,g is the generation loss of the heating system
    // Q h,reg is the quantity of regenerative energy used
    const generatorHeatOutputToHeating =
      await this.calculateGeneratorHeatOutputToHeating(body);
    const generationLossesOFHeating =
      await this.calculateGenerationLossesOFHeating(body);
    let Qhf =
      generatorHeatOutputToHeating +
      generationLossesOFHeating -
      parseFloat(body.Qhreg);
    return Qhf;
  };

  // cooling
  public calculateEnergyNeedForCooling = async (body): Promise<any> => {
    // The utilization factor η greatly depends on the ratio γ of the heat flows due to the
    // heat sources and the heat flows due to the heat sinks in the building zone
    const qSource = await this.calculateQSource(body);
    const qSink = await this.calculateQSink(body);
    let η = qSource / qSink;
    let Qcb = (1 - η) * qSource;
    return Qcb;
  };

  public calculateControlAndEmissionLossesOfCooling = async (
    body
  ): Promise<any> => {
    // Qc,ce = ((1 – ηc,ce ) + (1 – ηc,ce,sens )) ⋅ Qc,b
    // ηc,ce is the efficiency of control and emission of cooling to the room conditioning system
    // ηc,ce,sens is the sensible efficiency of control and emission to the room conditioning system
    // Qc,b is the energy need for cooling
    const energyNeedForCooling = await this.calculateEnergyNeedForCooling(body);
    let QCCe = (1 - parseFloat(body.ηCCe) + (1 - parseFloat(body.ηCCeSens))) * energyNeedForCooling;
    return QCCe;
  };

  public calculateDistributionLossesOfCooling = async (body): Promise<any> => {
    // Qc,d = (1 – ηc,d ) ⋅ Qc,b
    // ηc,d is the efficiency of the distribution
    // Qc,b is the energy need for cooling
    const energyNeedForCooling = await this.calculateEnergyNeedForCooling(body);
    let Qcd = (1 - parseFloat(body.ηcd)) * energyNeedForCooling;
    return Qcd;
  };

  public calculateGeneratorCoolingEnergyOutputToCooling = async (
    body
  ): Promise<any> => {
    let Qcs = 0;
    // Qc,b,i is the energy need for cooling
    // Qc,ce is the control and emission loss of the cooling system
    // Qc,d is the distribution loss of the cooling system
    // Qc,s is the cooling loss of storage for the cooling system
    // Qc,s = 0

    let QCbi = await this.calculateEnergyNeedForCooling(body);
    let QCCe = await this.calculateControlAndEmissionLossesOfCooling(body);
    let Qcd = await this.calculateDistributionLossesOfCooling(body);
    let Qcoutg = QCbi + QCCe + Qcd + Qcs; // where Qcs = 0
    return Qcoutg;
  };

  public calculateDeliveredEnergyForCooling = async (body) => {
    // Qc,f = Qc,outg + Qc,g – Qc,reg
    // Qc,f is the delivered energy for the cold generator
    // Qc,outg is the net cooling energy output to the cooling system
    let Qcg = 0;

    // to calculate the Qc,reg we need Qc,f value but we do not have the Qc,f value
    // because before calculate the Qc,f how we can get the Qc,f to calculate the Qc,reg
    // so currently we take the QCreg value as an input
    // Qc,reg is the quantity of regenerative energy used
    // Qc,reg = Qc,outg – Qc,f
    const generatorCoolingEnergyOutputToCooling =
      await this.calculateGeneratorCoolingEnergyOutputToCooling(body);
    let Qcf = generatorCoolingEnergyOutputToCooling + (Qcg - parseFloat(body.QcReg)); // where Qcg = 0
    return Qcf;
  };
}
