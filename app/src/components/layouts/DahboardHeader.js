import React from "react";
import { useStore } from "../../store";

function DahboardHeader({ name }) {
  const { keyword, setKeyword } = useStore((s) => s);

  return (
    <>
      <div className="searchMain d-flex justify-content-between align-items-center w-100">
        <h3>{name}</h3>
        <div className="searchBar input-group">
          <img src="/assets/imgs/search.svg" alt="" />
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default DahboardHeader;
