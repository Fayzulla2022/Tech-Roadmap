import React, { useEffect, useState } from "react";
import DahboardHeader from "../../layouts/DahboardHeader";
import RoadMapCard from "../../layouts/RoadMapCard";
import ROADMAPS from "../../../utils/roadmaps.json";
import { useStore } from "../../../store";

function Roadmap({ collapsed }) {
  const { keyword } = useStore((s) => s);
  const [list, setList] = useState(ROADMAPS);

  useEffect(() => {
    if (keyword?.length === 0) {
      setList(ROADMAPS);
    } else {
      let r = [];
      for (let i = 0; i < ROADMAPS?.length; i++) {
        let currentRoadmap = ROADMAPS[i];
        if (
          currentRoadmap?.title
            ?.toLowerCase()
            ?.includes(keyword?.toLowerCase()) &&
          r?.findIndex((k) => k?.id === currentRoadmap?.id) === -1
        ) {
          r.push(currentRoadmap);
        }
      }
      setList(r);
    }
  }, [keyword]);

  return (
    <>
      <DahboardHeader name={"Roadmaps"} collapsed={collapsed} />
      <div className="mainLayout mt-3">
        <div className="roleBased">All Roadmaps</div>
        <section>
          {collapsed ? (
            <div className="row g-3">
              {list.map((data, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                  <RoadMapCard data={data} />
                </div>
              ))}
            </div>
          ) : (
            <div className="row g-3">
              {list.map((data, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                  <RoadMapCard data={data} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default Roadmap;
