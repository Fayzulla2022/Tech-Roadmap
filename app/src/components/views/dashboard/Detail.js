import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DahboardHeader from "../../layouts/DahboardHeader";
import Timeline from "../../layouts/Timeline";
import ROADMAPS from "../../../utils/roadmaps.json";
import { usePersistStore } from "../../../store";
import UserService from "../../../services/user";

function Detail({ collapsed }) {
  const { token, user, setUser } = usePersistStore((s) => s);
  let [data, setData] = useState(null);
  let [allExpanded, setAllExpanded] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    if (!id) return;

    let r = ROADMAPS.find((k) => k.id === id);
    if (r) {
      setData(r);
    }
    let r2 = user?.favourites?.find((k) => k === id);
    if (r2) {
      setIsFavourite(true);
    }
    let r3 = user?.roadmaps?.find((k) => k?.id === id);
    if (r3) {
      setIsStarted(true);
      let done = (r3?.done?.length / r3?.courses) * 100;
      let inprogress = (r3?.inprogress?.length / r3?.courses) * 100;
      let skipped = (r3?.skipped?.length / r3?.courses) * 100;
      setProgress({
        done,
        inprogress,
        skipped,
      });
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    let r3 = user?.roadmaps?.find((k) => k?.id === id);
    if (r3) {
      setIsStarted(true);
      let done = (r3?.done?.length / r3?.courses) * 100;
      let inprogress = (r3?.inprogress?.length / r3?.courses) * 100;
      let skipped = (r3?.skipped?.length / r3?.courses) * 100;
      setProgress({
        done,
        inprogress,
        skipped,
      });
    }
  }, [user?.roadmaps]);

  const handleCollapse = () => {
    document.querySelectorAll(".accordion-button").forEach((el) => el.click());
    setAllExpanded(!allExpanded);
  };

  const handleAddFavourite = async () => {
    if (!token || !user) return;
    if (!id) return;
    await UserService.addFavourite(token, { id: id }).then((result) => {
      if (result?.data) {
        setUser(result?.data);
        setIsFavourite(true);
      }
    });
  };

  const handleRemoveFavourite = async () => {
    if (!token || !user) return;
    if (!id) return;
    await UserService.removeFavourite(token, { id: id }).then((result) => {
      if (result?.data) {
        setUser(result?.data);
        setIsFavourite(false);
      }
    });
  };

  async function handleShare() {
    let text = `${process.env.REACT_APP_PUBLIC_URL}/details/${id}`;
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
    } else {
      document.execCommand("copy", true, text);
    }

    setTimeout(() => {
      document.getElementById("txt-share").innerText = "Copied!";
    }, 300);
  }

  const handleRemoveRoadmap = async () => {
    if (!token || !user) return;
    if (!id) return;
    if (window.confirm("Are you sure? All your progress will be lost.")) {
      await UserService.removeRoadmap(token, { id: id }).then((result) => {
        if (result?.data) {
          setUser(result?.data);
          setIsStarted(false);
        }
      });
    }
  };

  const handleAddRoadmap = async () => {
    if (!token || !user) return;
    if (!id) return;
    let obj = {
      id: id,
      title: data?.title,
      courses: data?.courses?.length,
      done: [],
      skipped: [],
      inprogress: [],
    };
    await UserService.addRoadmap(token, obj).then((result) => {
      if (result?.data) {
        setUser(result?.data);
        setIsStarted(true);
      }
    });
  };

  if (!id) return <></>;
  return (
    <>
      <DahboardHeader name={"Roadmaps"} collapsed={collapsed} />
      <div className="mainLayout mt-3">
        <img
          src={data?.imageUrl}
          className="w-100 detailBanner"
          alt=""
          style={{ height: 200, objectFit: "cover" }}
        />
        <div className="row detailText mt-3">
          <div className="col-xl-7">
            <h1>{data?.title}</h1>
            <p className="mb-1">{data?.description}</p>
            <div className="d-flex gap-3">
              <p className="mb-0">
                {data?.year} • {data?.category}
              </p>
              <div className="d-flex gap-3">
                {data?.icons?.map((k, idx) => (
                  <img key={idx} src={k} width={20} alt="" />
                ))}
              </div>
            </div>
            <div className="d-flex gap-2 mt-3 flex-wrap">
              {data?.tags?.map((k, idx) => (
                <div className="hashTag" key={idx}>
                  #{k}
                </div>
              ))}
            </div>
          </div>
          <div className="col-xl-5 mt-xl-0 mt-2">
            <div className="d-flex align-item-center flex-wrap gap-2 justify-content-end">
              <div className="progres">
                <img
                  src="/assets/imgs/progress.svg"
                  className="me-2"
                  width="20"
                  alt=""
                />
                <span>Progress</span>
              </div>
              <div className="progres withBg" onClick={handleShare}>
                <img
                  src="/assets/imgs/share.svg"
                  className="me-2"
                  width="20"
                  alt=""
                />
                <span id="txt-share">SHARE</span>
              </div>
              <div className="progres withBg">
                {isFavourite ? (
                  <>
                    <img
                      src="/assets/imgs/favourite.svg"
                      width="45"
                      alt=""
                      onClick={handleRemoveFavourite}
                    />
                    <span>SAVED</span>
                  </>
                ) : (
                  <>
                    <img
                      src="/assets/imgs/favourite-outline.svg"
                      width="45"
                      alt=""
                      onClick={handleAddFavourite}
                    />
                    <span>SAVE</span>
                  </>
                )}
              </div>
              {isStarted ? (
                <Link
                  className="explore"
                  style={{
                    backgroundColor: "#DC3545",
                    border: "1px solid #DC3545",
                  }}
                  onClick={handleRemoveRoadmap}
                >
                  Remove
                </Link>
              ) : (
                <Link className="explore" onClick={handleAddRoadmap}>
                  Start
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="statusBar mt-3">
          <div className="row">
            <div className="col-xl-3 col-lg-4 mt-xl-0 mt-2">
              <div className="d-flex statusItem gap-2 align-items-center">
                <div className="percentage">
                  <p className="mb-0">Done</p>
                  <h3 className="text-white">{progress?.done || 0}%</h3>
                </div>
                <img
                  src="/assets/imgs/line.png"
                  className="dottedLine"
                  alt=""
                />
                <img src="/assets/imgs/done.svg" width={40} alt="" />
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 mt-xl-0 mt-2">
              <div className="d-flex statusItem gap-2 align-items-center">
                <div className="percentage">
                  <p className="mb-0">In Progress</p>
                  <h3 className="text-white">{progress?.inprogress || 0}%</h3>
                </div>
                <img
                  src="/assets/imgs/line.png"
                  className="dottedLine"
                  alt=""
                />
                <img src="/assets/imgs/in-progress.svg" width={40} alt="" />
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 mt-xl-0 mt-2">
              <div className="d-flex statusItem gap-2 align-items-center">
                <div className="percentage">
                  <p className="mb-0">Skipped</p>
                  <h3 className="text-white">{progress?.skipped || 0}%</h3>
                </div>
                <img
                  src="/assets/imgs/line.png"
                  className="dottedLine"
                  alt=""
                />
                <img src="/assets/imgs/skipped.svg" width={40} alt="" />
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 mt-xl-0 mt-2">
              <div className="d-flex statusItem gap-2 align-items-center">
                <div className="percentage">
                  <p className="mb-0">Lessons</p>
                  <h3 className="text-white">{data?.count}</h3>
                </div>
                <img
                  src="/assets/imgs/line.png"
                  className="dottedLine"
                  alt=""
                />
                <img src="/assets/imgs/total.svg" width={40} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="timeLineMain mt-3">
          <div className="text-center detailText d-flex justify-content-center mb-5">
            {allExpanded ? (
              <div
                className="progres"
                style={{ width: "190px", height: "45px" }}
                onClick={handleCollapse}
              >
                <img
                  src="/assets/imgs/collapse-all.svg"
                  className="me-2"
                  width="20"
                  alt=""
                />
                <span>Collapse All</span>
              </div>
            ) : (
              <div
                className="progres"
                style={{ width: "190px", height: "45px" }}
                onClick={handleCollapse}
              >
                <img
                  src="/assets/imgs/scale.svg"
                  className="me-2"
                  width="20"
                  alt=""
                />
                <span>Expand All</span>
              </div>
            )}
          </div>
          <Timeline courses={data?.courses} />
        </div>
      </div>
    </>
  );
}

export default Detail;
