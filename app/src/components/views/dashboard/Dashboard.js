import React, { useEffect, useState } from "react";
import PieChart from "../../charts/PieChart";
import BarChart from "../../charts/BarChart";
import LineChart from "../../charts/LineChart";
import DoughnutChart from "../../charts/DoughnutChart";
import DahboardHeader from "../../layouts/DahboardHeader";
import { usePersistStore } from "../../../store";
import ROADMAPS from "../../../utils/roadmaps.json";

function Dashboard({ collapsed }) {
  const { user, token } = usePersistStore((s) => s);
  const [list, setList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [completionFilter, setCompletionFilter] = useState(100);

  useEffect(() => {
    if (!user || !token) return;
    let roadmaps = user?.roadmaps || [];
    let result = [];
    for (let i = 0; i < roadmaps.length; i++) {
      let roadmap = roadmaps[i];
      let _r = ROADMAPS.find((k) => k?.id === roadmap.id);
      let done = (roadmap.done.length / roadmap.courses) * 100;
      result.push({
        language: roadmap.title,
        completion: done,
        status: done === 100 ? "Completed" : "Active",
        type: `${roadmap.done.length} / ${roadmap.courses}`,
        logo: _r.imageUrl,
      });
    }
    setList(result);
    setFilteredItems(result);
  }, [user, token]);

  useEffect(() => {
    const filtered = list.filter((item) => {
      return (
        (item.status === statusFilter || statusFilter === "All") &&
        item.completion <= completionFilter
      );
    });
    setFilteredItems(filtered);
  }, [statusFilter, completionFilter, list]);

  return (
    <>
      <DahboardHeader name={"Dashboard"} collapsed={collapsed} />

      <div className="mainLayout mt-3">
        <div className="roleBased">Your Dashboard</div>
        <div className="row">
          <div className="col-12">
            <div className="filter-controls">
              <label htmlFor="statusFilter">Status:</label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Active">Active</option>
              </select>

              <label htmlFor="completionFilter" className="white-text">
                Max Completion:
              </label>

              <input
                type="range"
                id="completionFilter"
                min="0"
                max="100"
                value={completionFilter}
                onChange={(e) =>
                  setCompletionFilter(parseInt(e.target.value, 10))
                }
              />
              <span id="rangeValue">{completionFilter}%</span>
            </div>
          </div>
        </div>

        <section className="mt-3">
          <div className="row">
            <div className="col-12">
              <div className="">
                <div className="row g-4">
                  <div className="col-sm-6">
                    <div className="chartHolder">
                      <h1 className="text-center">Your Enrollment</h1>
                      <PieChart />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="chartHolder lineChartHolder">
                      {" "}
                      <h1 className="text-center">Progress Over Time</h1>
                      <LineChart
                        data={filteredItems.map((item) => ({
                          label: item.language,
                          value: item.completion,
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-sm-6">
              <div className="chartHolder">
                <h1 className="text-center">Detailed Progress</h1>
                <BarChart
                  data={filteredItems.map((item) => ({
                    label: item.language,
                    value: item.completion,
                  }))}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="chartHolder">
                <h1 className="text-center">Detailed Progress</h1>
                <DoughnutChart
                  data={filteredItems.map((item) => ({
                    label: item.language,
                    value: item.completion,
                  }))}
                />
              </div>
            </div>
          </div>
          <section className="progressHolder mt-3">
            <div className="progressMain">
              <h1>Progress</h1>
              <p className="d-flex gap-2 align-items-center">
                <img src="/assets/imgs/circle.svg" width={20} alt="" />
                <span>Your programming languages progress</span>
              </p>
              <div className="filter-controls">
                <label htmlFor="statusFilter">Status:</label>
                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Completed">Completed</option>
                  <option value="Active">Active</option>
                </select>
                <label htmlFor="completionFilter">Max Completion:</label>
                <input
                  id="completionFilter"
                  type="range"
                  min="0"
                  max="100"
                  value={completionFilter}
                  onChange={(e) =>
                    setCompletionFilter(parseInt(e.target.value))
                  }
                />
                <span id="rangeValue">{completionFilter}%</span>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>ROADMAP</th>
                    <th>COURSES</th>
                    <th>STATUS</th>
                    <th>COMPLETION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={item.logo}
                          width={30}
                          className="me-2"
                          alt=""
                          style={{ objectFit: "cover", borderRadius: 4 }}
                        />
                        {item.language}
                      </td>
                      <td>{item.type}</td>
                      <td>{item.status}</td>
                      <td>
                        <div className="progress" style={{ height: "5px" }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${item.completion}%` }}
                            aria-valuenow={item.completion}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
        <br></br>

        <div className="progressMain additional-spacing">
          <h1>Progress</h1>
          <div className="filter-controls">
            <label htmlFor="statusFilter">Status:</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Active">Active</option>
            </select>
            <label htmlFor="completionFilter">Max Completion:</label>
            <input
              id="completionFilter"
              type="range"
              min="0"
              max="100"
              value={completionFilter}
              onChange={(e) => setCompletionFilter(parseInt(e.target.value))}
            />
            <span id="rangeValue">{completionFilter}%</span>
          </div>

          <div className="d-flex flex-wrap gap-3">
            {filteredItems.map((item, index) => (
              <div key={index} className="card" style={{ width: "18rem" }}>
                <img
                  src={item?.logo}
                  className="card-img-top"
                  alt=""
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.language}</h5>
                  <p className="card-text">{item.type}</p>
                  <p className="card-text">Status: {item.status}</p>
                  <div className="progress" style={{ height: "20px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${item.completion}%` }}
                      aria-valuenow={item.completion}
                      aria-valuemin={0}
                      aria-valuemax={100}>
                      {item.completion}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
