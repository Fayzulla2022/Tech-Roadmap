import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import UserService from "../../services/user";
import { usePersistStore } from "../../store";

function Signin() {
  let navigate = useNavigate();
  const { setToken, setUser } = usePersistStore((s) => s);
  const [values, setValues] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    setErrorMessage(null);
    if (!values?.email || !values?.password) {
      setErrorMessage("Please provide all fields.");
      return;
    }
    UserService.login(values)
      .then((res) => {
        if (res.error) {
          setErrorMessage(res.error);
          return;
        }

        setUser(res?.data?.user);
        setToken(res?.data?.token);
        navigate("/tags");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="authPageHeader position-relative">
        <Header />
      </div>
      <div className="container-fluid authPage">
        <div className="row">
          <div className="col-lg-8 col-md-6 col-12 leftSide d-md-flex d-none">
            <div className="bannerSection my-auto">
              <div className="text">
                <h2 className="mb-0">Your handy Guide</h2>
                <svg
                  className="line my-3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="2"
                  viewBox="0 0 500 2"
                  fill="none"
                >
                  <path d="M0 1H500" stroke="url(#paint0_linear_2091_18973)" />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2091_18973"
                      x1="0"
                      y1="1"
                      x2="495.177"
                      y2="1"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#E0E1E2" stopOpacity="0" />
                      <stop offset="0.5" stopColor="#E0E1E2" />
                      <stop
                        offset="1"
                        stopColor="#E0E1E2"
                        stopOpacity="0.15625"
                      />
                    </linearGradient>
                  </defs>
                </svg>
                <h1>
                  Empower your <br /> Development Journey
                </h1>
                <p>
                  Empower Your Development Journey: We provide detailed roadmaps
                  and guidance tailored for young and mid-level developers,
                  helping you navigate the complex world of programming and
                  technology.
                </p>
                <hr />
                <p>727 Technologies, Coding Languages & Frameworks</p>
                <div className="d-flex gap-3 mb-3">
                  <img src="/assets/imgs/texh.svg" width={20} alt="" />
                  <span>727 Technologies, Coding Languages & Frameworks</span>
                </div>
                <div className="d-flex gap-3 mb-3">
                  <img src="/assets/imgs/texh.svg" width={20} alt="" />
                  <span>727 Technologies, Coding Languages & Frameworks</span>
                </div>
                <div className="d-flex gap-3 mb-3">
                  <img src="/assets/imgs/texh.svg" width={20} alt="" />
                  <span>727 Technologies, Coding Languages & Frameworks</span>
                </div>
                <div className="d-flex gap-3 mb-3">
                  <img src="/assets/imgs/texh.svg" width={20} alt="" />
                  <span>727 Technologies, Coding Languages & Frameworks</span>
                </div>
                <div className="d-flex gap-4 mt-4">
                  <img src="/assets/imgs/js.svg" width={50} alt="" />
                  <img src="/assets/imgs/css3.svg" width={50} alt="" />
                  <img src="/assets/imgs/react.svg" width={50} alt="" />
                  <img src="/assets/imgs/angular.svg" width={50} alt="" />
                  <img src="/assets/imgs/coding.svg" width={50} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className=" col-lg-4 col-md-6 col-12 rightSide d-md-flex">
            <div className="holder my-auto">
              <img src="/assets/imgs/logo.svg" width={240} alt="" />
              <p className="text-white">Welcome back!</p>
              <svg
                className="line"
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="2"
                viewBox="0 0 500 2"
                fill="none"
              >
                <path d="M0 1H500" stroke="url(#paint0_linear_2091_18973)" />
                <defs>
                  <linearGradient
                    id="paint0_linear_2091_18973"
                    x1="0"
                    y1="1"
                    x2="495.177"
                    y2="1"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E0E1E2" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#E0E1E2" />
                    <stop
                      offset="1"
                      stopColor="#E0E1E2"
                      stopOpacity="0.15625"
                    />
                  </linearGradient>
                </defs>
              </svg>
              <h3 className="mb-0">Sign In</h3>
              <p className="mb-3">Enter your Email and Password.</p>
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter your email"
                    name="email"
                    value={values?.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your Password"
                    name="password"
                    value={values?.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckChecked"
                  >
                    Remember Me
                  </label>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Continue
                </button>
              </form>
              {errorMessage && (
                <p className="text-danger mb-2">{errorMessage}</p>
              )}
              <p>
                Don’t have account?{" "}
                <strong>
                  {" "}
                  <Link to="/register">Register</Link>
                </strong>
              </p>
              <svg
                className="line"
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="2"
                viewBox="0 0 500 2"
                fill="none"
              >
                <path d="M0 1H500" stroke="url(#paint0_linear_2091_18973)" />
                <defs>
                  <linearGradient
                    id="paint0_linear_2091_18973"
                    x1="0"
                    y1="1"
                    x2="495.177"
                    y2="1"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E0E1E2" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#E0E1E2" />
                    <stop
                      offset="1"
                      stopColor="#E0E1E2"
                      stopOpacity="0.15625"
                    />
                  </linearGradient>
                </defs>
              </svg>
              <p>Continue with</p>
                <div className="d-flex gap-3 socialIcons mt-3 justify-content-center">
                  <img src="/assets/imgs/facebook.svg" width={50} alt="" />
                  <img src="/assets/imgs/apple.svg" width={50} alt="" />
                  <img src="/assets/imgs/google.svg" width={50} alt="" />
                </div>
              <div className="stickBottom">
                <div className="d-flex gap-md-3 gap-2 flex-wrap justify-content-center">
                  <p className="mb-0">Milely, Inc. Copyright © 2024</p>
                  <p className="mb-0">
                    <Link to="">Blog</Link>
                  </p>
                  <p className="mb-0">
                    <Link to="">Licence</Link>
                  </p>
                  <p className="mb-0">
                    <Link to="">Support</Link>
                  </p>
                </div>
                <p className="mt-2">London, England, U.K</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
