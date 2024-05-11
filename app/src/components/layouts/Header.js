import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/assets/imgs/logo.svg" width={140} alt="" />
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars" style={{ color: "white" }}></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/roadmaps">
                  <img src="/assets/imgs/roadmap.svg" width={20} alt="" />{" "}
                  RoadMaps
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/resources">
                  <img src="/assets/imgs/resources.svg" width={20} alt="" />{" "}
                  Resources
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  <img src="/assets/imgs/register.svg" width={20} alt="" />{" "}
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="signIn" to="/sign-in">
                  <img src="/assets/imgs/key.svg" width={20} alt="" />{" "}
                  <span>Sign In</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
