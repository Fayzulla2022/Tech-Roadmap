import React, { useEffect, useState } from "react";
import DahboardHeader from "../../layouts/DahboardHeader";
import RoadMapCard from "../../layouts/RoadMapCard";
import { usePersistStore } from "../../../store";
import ROADMAPS from "../../../utils/roadmaps.json";

function Saved({ collapsed }) {
  const { token, user } = usePersistStore((s) => s);
  let [list, setList] = useState([]);

  useEffect(() => {
    if (!token || !user) return;
    let favs = user?.favourites || [];
    let t = [];
    ROADMAPS.forEach((k) => {
      if (favs?.includes(k?.id)) {
        t.push(k);
      }
    });

    if (t?.length > 0) {
      setList(t);
    }
  }, []);

  return (
    <>
      <DahboardHeader name={"Roadmaps"} collapsed={collapsed} />
      <div className="mainLayout mt-3">
        <div className="roleBased">Your Saved Roadmaps</div>
        <section>
          {list?.length === 0 ? (
            <div className="text-white">You don't have any favourites.</div>
          ) : (
            <>
              {collapsed ? (
                <div className="row g-4">
                  {list.map((data, index) => (
                    <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                      <RoadMapCard data={data} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row g-4">
                  {list.map((data, index) => (
                    <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                      <RoadMapCard data={data} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default Saved;
