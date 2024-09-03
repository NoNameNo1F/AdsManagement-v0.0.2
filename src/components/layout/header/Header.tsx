import React from 'react';
import "./Header.css";
import { ListArea } from '../../page/area';
import { redirect } from 'react-router-dom';
const Header: React.FC = () => {

  return (
    <nav className="navbar navbar-expand-lg px-3">
      <div className="d-flex align-items-center w-100 justify-content-between">
        {/* Navbar Left */}
        <div className="navbar-left d-flex align-items-center">
          <a href="/" className="navbar-brand">
            <img className="navbar-logo rounded-circle" src="/assets/images/logo-ads.jpg" alt="Logo" width="40" height="40" />
          </a>
          <button className="btn mx-2">Dashboard</button>
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              id="selectRegionsDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select Regions
            </button>
            <ul className="dropdown-menu" aria-labelledby="selectRegionsDropdown">
              <ListArea />
            </ul>
          </div>
        </div>

        {/* Navbar Right */}
        <div className="d-flex align-items-center">
          <div className="navbar-right-item text-center mx-3">
            <i className="bi bi-card-heading" />
            <span className="d-block small" onClick={() => alert('search anya ha <3')}>Ads Points</span>
          </div>
          <div className="navbar-right-item text-center mx-3">
            <i className="bi bi-globe-asia-australia"></i>
            <span className="d-block small">Language</span>
          </div>
          {/* <div className="navbar-right-item text-center mx-3" onClick={() => alert('search anya ha <3')}>
            <i className="bi bi-search"></i>
            <span className="d-block small">Search</span>
          </div> */}
          <div className="navbar-right-item text-center mx-3" onClick={() => ('https://keycloak.codedynamite.click/login')}>
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="d-block small">Login</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
