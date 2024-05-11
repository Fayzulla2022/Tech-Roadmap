import React, { useState } from "react";
import { Link } from "react-router-dom";
import technologies from "../../utils/tags.json";
import { usePersistStore } from "../../store";
import UserService from "../../services/user";

const TagList = ({ tags }) => {
  const [activeTags, setActiveTags] = useState([]);

  const handleClick = (tag) => {
    const index = activeTags.indexOf(tag);
    if (index === -1) {
      setActiveTags([...activeTags, tag]);
    } else {
      const newTags = [...activeTags];
      newTags.splice(index, 1);
      setActiveTags(newTags);
    }
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

function Tags() {
  const { token, setUser } = usePersistStore((s) => s);
  const [visibleTags, setVisibleTags] = useState(15);
  const handleLoadMore = () => {
    setVisibleTags(visibleTags + 10);
  };
  const handleSubmit = () => {
    let t = [];
    document.querySelectorAll(".tag.active").forEach((a) => {
      t.push(a.textContent);
    });
    t = t.join(",");
    if (t?.length > 0) {
      UserService.updateTags(token, { tags: t }).then((result) => {
        if (result?.data) {
          setUser(result?.data);
        }
        window.location.href = "/level";
      });
    } else {
      window.location.href = "/level";
    }
  };
  return (
    <div className="tagMain">
      <div className="container">
        <div className="row">
          <div className="col-12 my-auto">
            <img src="/assets/imgs/logo.svg" width={240} alt="" />
            <h1>Choose the tags that interests you</h1>
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
            <h3>Technologies / Languages</h3>
            <TagList tags={technologies.slice(0, visibleTags)} />
            <div className="d-flex gap-5 justify-content-center my-5">
              <button
                onClick={handleLoadMore}
                disabled={visibleTags >= technologies.length}
                className="loadMore"
              >
                Show more suggestions
              </button>
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

export default Tags;
