import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/user";
import { usePersistStore } from "../../store";

const TagList = ({ tags }) => {
  const [activeTags, setActiveTags] = useState([]);

  const handleClick = (tag) => {
    setActiveTags(tag);
  };

  return (
    <div className="tag-list">
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`tag ${activeTags.includes(tag) ? "active" : ""}`}
          onClick={() => handleClick(tag)}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

function Level() {
  const { token, setUser } = usePersistStore((s) => s);
  const handleSubmit = () => {
    let t = [];
    document.querySelectorAll(".tag.active").forEach((a) => {
      t.push(a.textContent);
    });
    t = t.join(",");
    if (t?.length > 0) {
      UserService.updateLevel(token, { level: t }).then((result) => {
        if (result?.data) {
          setUser(result?.data);
        }
        window.location.href = "/";
      });
    } else {
      window.location.href = "/";
    }
  };

  const technologies = [
    "Junior Level",
    "Mid Level",
    "Senior Level",
    "Full-Stack Level",
  ];

  return (
    <div className="tagMain">
      <div className="container">
        <div className="row">
          <div className="col-12 my-auto">
            <img src="/assets/imgs/logo.svg" width={240} alt="" />
            <h1>Choose your experience level</h1>
            <p>
              Remember that your roadmap will be constructed according to your
              pick of choices!
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
                  <stop offset="1" stopColor="#E0E1E2" stopOpacity="0.15625" />
                </linearGradient>
              </defs>
            </svg>
            <h3>Expertise / Level</h3>
            <TagList tags={technologies} />
            <div className="d-flex gap-5 justify-content-center my-5">
              <button className="loadMore blueBtn" onClick={handleSubmit}>
                Save my preference
              </button>
            </div>
          </div>
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
            <p className="mb-0">London, England, U.K</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Level;
