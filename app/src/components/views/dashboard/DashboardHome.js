import React, { useEffect, useState } from "react";
import DahboardHeader from "../../layouts/DahboardHeader";
import RoadMapCard from "../../layouts/RoadMapCard";
import { usePersistStore } from "../../../store";
import ROADMAPS from "../../../utils/roadmaps.json";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import technologies from "../../../utils/tags.json";
import UserService from "../../../services/user";

const TagList = ({ tags }) => {
  const { user } = usePersistStore((s) => s);
  const [activeTags, setActiveTags] = useState(user?.tags?.split(",") || []);

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

function DashboardHome({ collapsed }) {
  const { token, user, setUser } = usePersistStore((s) => s);
  const [tags, setTags] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!token || !user) return;

    let t = user?.tags;
    t =
      t
        ?.split(",")
        ?.map((k) => k?.trim())
        ?.filter((k) => k?.length > 0) || [];
    setTags(t);

    let r = [];
    for (let i = 0; i < ROADMAPS?.length; i++) {
      let currentRoadmap = ROADMAPS[i];
      let currentRoadmapTags =
        currentRoadmap?.tags?.map((k) => k?.toLowerCase()) || [];
      for (let j = 0; j < t?.length; j++) {
        let currentTag = t[j];
        if (
          currentRoadmapTags?.includes(currentTag?.toLowerCase()) &&
          currentRoadmap?.level === user?.level &&
          r?.findIndex((k) => k?.id === currentRoadmap?.id) === -1
        ) {
          r.push(currentRoadmap);
        }
      }
    }

    setRoadmaps(r);
  }, [user]);

  const handleSubmit = () => {
    let t = [];
    document.querySelectorAll(".roadDashboardHome .tag.active").forEach((a) => {
      let text = a.textContent.trim();
      if (text?.length > 0) {
        t.push(text);
      }
    });
    t = t.map((k) => k.trim()).join(",");
    UserService.updateTags(token, { tags: t }).then((result) => {
      if (result?.data) {
        setUser(result?.data);
      }
      setShowPopup(false);
    });
  };

  return (
    <>
      <Rodal
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        width={800}
        height={600}
        customStyles={{
          padding: 0,
          overflowY: "hidden",
          border: "2px solid #000",
          borderRadius: 24,
        }}
      >
        <div className="tagMain roadDashboardHome">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <TagList tags={technologies} />
                <div className="d-flex gap-5 justify-content-center mt-5">
                  <button className="loadMore blueBtn" onClick={handleSubmit}>
                    Save my preference
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Rodal>
      <DahboardHeader name={"Home"} collapsed={collapsed} />
      <div className="mainLayout mt-3">
        <section>
          <h1>Recommended Roadmaps For you</h1>
          <p>Tailored according to your preferred topics of your choice!</p>
          <div className="row">
            <div className="col-md-3 col-sm-4">
              <div className="welcomeBack">
                <div className="d-flex flex-column justify-content-between">
                  <span>
                    <p>Your handy guide,</p>
                    <h1>Welcome back, {user?.name}!</h1>
                  </span>
                  <p>Glad to see you again!</p>
                </div>
              </div>
            </div>
            <div className="col-md-9 col-sm-8">
              <div className="prefferedLang">
                <div className="d-flex justify-content-between head">
                  <h1>Preferred Languages & Technologies</h1>
                  <div className="d-flex gap-3">
                    <div
                      className="d-flex gap-1 edit align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPopup(true)}
                    >
                      <img src="/assets/imgs/edit.svg" alt="" />
                      <p>Edit</p>
                    </div>
                  </div>
                </div>
                <div className="tag-list" style={{ paddingBottom: 40 }}>
                  {tags?.length === 0 && (
                    <div className="text-white">No tag preference found.</div>
                  )}
                  {tags?.map((tag, index) => (
                    <div key={index} className="tag active">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-4">
          {collapsed ? (
            <div className="row g-4">
              {roadmaps.map((data, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                  <RoadMapCard data={data} />
                </div>
              ))}
            </div>
          ) : (
            <div className="row g-4">
              {roadmaps.map((data, index) => (
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

export default DashboardHome;
