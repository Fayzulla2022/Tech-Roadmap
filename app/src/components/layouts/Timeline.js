import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { usePersistStore } from "../../store";
import { useParams } from "react-router-dom";
import UserService from "../../services/user";

function Timeline({ courses }) {
  const { token, user, setUser } = usePersistStore((s) => s);
  let [progress, setProgress] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    if (!id) return;
    let r3 = user?.roadmaps?.find((k) => k?.id === id);
    if (r3) {
      setProgress(r3);
    }
  }, [id, user]);

  const handleSetSkipped = async (item) => {
    if (!progress) {
      return alert(
        "Please start a course first before you record its progress."
      );
    }
    let done = progress?.done?.filter((k) => k?.id !== item?.id);
    let inprogress = progress?.inprogress?.filter((k) => k?.id !== item?.id);
    let skipped = progress?.skipped;
    if (skipped.findIndex((k) => k?.id === item?.id) === -1) {
      skipped.push({ id: item?.id, stage: item?.stage });
    }

    await UserService.updateRoadmap(token, {
      ...progress,
      done,
      inprogress,
      skipped,
    }).then((result) => {
      if (result?.data) {
        setUser(result?.data);
      }
    });
  };

  const handleSetInProgress = async (item) => {
    if (!progress) {
      return alert(
        "Please start a course first before you record its progress."
      );
    }
    let done = progress?.done?.filter((k) => k?.id !== item?.id);
    let skipped = progress?.skipped?.filter((k) => k?.id !== item?.id);
    let inprogress = progress?.inprogress;
    if (inprogress.findIndex((k) => k?.id === item?.id) === -1) {
      inprogress.push({ id: item?.id, stage: item?.stage });
    }

    await UserService.updateRoadmap(token, {
      ...progress,
      done,
      inprogress,
      skipped,
    }).then((result) => {
      if (result?.data) {
        setUser(result?.data);
      }
    });
  };

  const handleSetDone = async (item) => {
    if (!progress) {
      return alert(
        "Please start a course first before you record its progress."
      );
    }
    let skipped = progress?.skipped?.filter((k) => k?.id !== item?.id);
    let inprogress = progress?.inprogress?.filter((k) => k?.id !== item?.id);
    let done = progress?.done;
    if (done.findIndex((k) => k?.id === item?.id) === -1) {
      done.push({ id: item?.id, stage: item?.stage });
    }

    await UserService.updateRoadmap(token, {
      ...progress,
      done,
      inprogress,
      skipped,
    }).then((result) => {
      if (result?.data) {
        setUser(result?.data);
      }
    });
  };

  return (
    <>
      <VerticalTimeline>
        {courses?.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work">
            <div className="d-flex justify-content-between mb-1">
              <div className="d-flex gap-2">
                <img
                  src="/assets/imgs/skipped.svg"
                  width={25}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSetSkipped(item)}
                />
                <img
                  src="/assets/imgs/in-progress.svg"
                  width={25}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSetInProgress(item)}
                />
                <img
                  src="/assets/imgs/done.svg"
                  width={25}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSetDone(item)}
                />
              </div>
              <h1 className="mb-0">{item?.stage}</h1>
            </div>
            <p className="mb-1 mt-0">{item?.description}</p>
            <img
              src="/assets/imgs/line.svg"
              className="mb-3 timelineLine"
              alt=""
            />
            <div className="accordion" id={`accordion${index}`}>
              <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id={`heading_${item?.subStage?.id}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${item?.subStage?.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse${item?.subStage?.id}`}>
                    <img
                      src={item?.subStage?.icon}
                      className="me-2"
                      alt=""
                      style={{
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                      }}
                    />{" "}
                    {item?.subStage?.title}
                    <img
                      src="/assets/imgs/angle-down.svg"
                      className="angleDown"
                      width={30}
                      alt=""
                    />
                  </button>
                </h2>
                <div
                  id={`collapse${item?.subStage?.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading_${item?.subStage?.id}`}
                  data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    {item?.subStage?.childSubStages.map(
                      (childSubStage, childIndex) => (
                        <div
                          className="accordion"
                          key={childIndex}
                          id={`nestedAccordion${childSubStage?.id}`}>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id={`nestedHeading${childSubStage?.id}`}>
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#nested${childSubStage?.id}`}
                                aria-expanded="false"
                                aria-controls={`nested${childSubStage?.id}`}>
                                <div className="d-flex gap-3 justify-content-between">
                                  <img
                                    src="/assets/imgs/angle-down.svg"
                                    className="innerAngleDown"
                                    width={30}
                                    alt=""
                                  />
                                  <div>
                                    <h4 className="mb-0">
                                      {childSubStage?.title}
                                    </h4>
                                    <p className="mt-0">
                                      {childSubStage?.description}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            </h2>
                            <div
                              id={`nested${childSubStage?.id}`}
                              className="accordion-collapse collapse"
                              aria-labelledby={`nestedHeading${childSubStage?.id}`}
                              data-bs-parent={`nested${childSubStage?.id}`}>
                              <div className="accordion-body">
                                <div
                                  className="inner ps-4"
                                  style={{ borderLeft: "1px dashed #fff" }}>
                                  {childSubStage?.furtherSubStages.map(
                                    (
                                      furtherChildSubStage,
                                      furtherChildIndex
                                    ) => (
                                      <>
                                        <div
                                          key={furtherChildIndex}
                                          className="innerItem d-flex gap-3 align-items-center">
                                          <div>
                                            <h4 className="mb-0">
                                              {furtherChildSubStage?.title}
                                            </h4>
                                            <p className="mt-0">
                                              {
                                                furtherChildSubStage?.description
                                              }
                                            </p>
                                          </div>
                                          <a
                                            className="viewBtn"
                                            href={furtherChildSubStage?.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ textDecoration: "none" }}>
                                            View{" "}
                                            <img
                                              src="/assets/imgs/vie.svg"
                                              alt=""
                                            />
                                          </a>
                                        </div>
                                        <div className="seperator"></div>
                                      </>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </>
  );
}

export default Timeline;
