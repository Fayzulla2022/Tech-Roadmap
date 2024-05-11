import React from "react";
import Header from "../layouts/Header";

function Home() {
  return (
    <>
      <div className="homeBg">
        <div className="bannerSection">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Header />
              </div>
              <div className="col-12">
                <div className="text">
                  <h2>Your handy Guide</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="500"
                    height="2"
                    viewBox="0 0 500 2"
                    fill="none"
                  >
                    <path
                      d="M0 1H500"
                      stroke="url(#paint0_linear_2091_18973)"
                    />
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
                  <h1>Empower your Development Journey</h1>
                  <p>
                    Empower Your Development Journey: We provide detailed
                    roadmaps and guidance tailored for young and mid-level
                    developers, helping you navigate the complex world of
                    programming and technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
