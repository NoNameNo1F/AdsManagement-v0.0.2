import React from 'react';
import "./Header.css";
import { ListArea } from '../../page/area';
import { redirect, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleAdsContainer } from '../../../store/redux/Advertisement/actions';
const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg px-3">
      <div className="d-flex align-items-center w-100 justify-content-between">
        {/* Navbar Left */}
        <div className="navbar-left d-flex align-items-center">
          <a href="/" className="navbar-brand">
            <img className="navbar-logo rounded-circle" src="/assets/images/logo-ads.jpg" alt="Logo" width="40" height="40" />
          </a>
          <button className="btn mx-2" onClick={() => navigate('/dashboard')}><i className="bi bi-house-door-fill"></i>&nbsp;Dashboard</button>
          <div className="dropdown">
            <button
              className="btn"
              id="selectRegionsDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-geo-fill"></i>&nbsp;
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
            <i className="bi bi-newspaper"></i>
            <span className="d-block small" onClick={() => dispatch(handleAdsContainer(true))}>News</span>
          </div>
          <div className="navbar-right-item text-center mx-3" onClick={() => navigate('/login')}>
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="d-block small">Login</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
