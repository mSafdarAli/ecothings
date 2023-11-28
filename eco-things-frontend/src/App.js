import React from "react";
import HeatingForm from "./components/heating";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error404 from "./components/404";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import LightingForm from "./components/lighting";
import CoolingForm from "./components/cooling";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LightingForm />}></Route>
          <Route path="/lighting" element={<LightingForm />}></Route>
          <Route path="/heating" element={<HeatingForm />}></Route>
          <Route path="/cooling" element={<CoolingForm />}></Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
