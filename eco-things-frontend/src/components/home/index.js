import React, {useState} from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  const [isActive,setActive] = useState("lighting")
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Eco-Things
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className={` ${isActive === "lighting" ? 'active': ''} nav-link`} onClick={() => setActive("lighting")} to="/lighting">
                  Lighting
                </Link>
              </li>
              <li className="nav-item">
                <Link className={` ${isActive === "heating" ? 'active' : ''} nav-link`} onClick={() => setActive("heating")} to="/heating">
                  Heating
                </Link>
              </li>
              <li className="nav-item">
                <Link className={` ${isActive === "cooling" ? 'active' : ''} nav-link`}  onClick={() => setActive("cooling")} to="/cooling">
                  Cooling
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Home;
