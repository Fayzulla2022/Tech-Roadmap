import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { usePersistStore } from "../../store";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import UserService from "../../services/user";

const TagList = ({ tags }) => {
  const { user } = usePersistStore((s) => s);
  const [activeTags, setActiveTags] = useState(user?.level);

  const handleClick = (tag) => {
    setActiveTags(tag);
  };

  return (
    <div className="tag-list">
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`tag ${activeTags.includes(tag) ? "active" : ""}`}
          onClick={() => handleClick(tag)}>
          {tag}
        </div>
      ))}
    </div>
  );
};

function ProSidebar({ handleStateChange }) {
  const { token, logout, user, setUser } = usePersistStore((s) => s);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState(user?.name);
  const handleClick = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    handleStateChange(newCollapsedState);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const technologies = [
    "Junior Level",
    "Mid Level",
    "Senior Level",
    "Full-Stack Level",
  ];

  const handleSubmit = () => {
    let a = document.querySelector(".roadalSidebar .tag.active");
    let text = a.textContent.trim();
    UserService.update(token, { level: text, name: name }).then((result) => {
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
        height={400}
        customStyles={{
          padding: 0,
          overflowY: "hidden",
          border: "2px solid #000",
          borderRadius: 24,
        }}>
        <div className="tagMain roadalSidebar">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <TagList tags={technologies} />
                <div className="d-flex align-content-center gap-4 mt-5">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter your full name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e?.target?.value)}
                  />
                </div>
                <button
                  className="loadMore blueBtn mt-5"
                  onClick={handleSubmit}>
                  Save my preference
                </button>
              </div>
            </div>
          </div>
        </div>
      </Rodal>
      <Sidebar
        collapsed={collapsed}
        collapsedWidth="60px"
        backgroundColor="#080C29"
        width="300px">
        <div className="pt-4 pb-3 position-relative">
          <div className="w-100">
            <img
              src="/assets/imgs/logo.svg"
              className="logo"
              width={120}
              alt=""
            />
            <img
              src="/assets/imgs/logo-menu.svg"
              className="logoMenu"
              width={40}
              alt=""
            />
          </div>
          <img
            src="/assets/imgs/line.svg"
            className="line"
            width={160}
            alt=""
          />
          <img src="/assets/imgs/line-menu.svg" className="lineMenu" alt="" />
          {!collapsed ? (
            <img
              src="/assets/imgs/arrow.svg"
              onClick={handleClick}
              className="openArrow"
              width={35}
              alt=""
            />
          ) : (
            <img
              src="/assets/imgs/arrow.svg"
              onClick={handleClick}
              className="closeArrow"
              width={35}
              alt=""
            />
          )}
        </div>
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: "#1A1F37",
                color: "#000",
              },
            },
          }}>
          <MenuItem
            className={location.pathname === "/" ? "active" : ""}
            component={<Link to="/" />}>
            {location.pathname === "/" ? (
              <img
                src="/assets/imgs/menu-home-active.svg"
                className="me-2"
                width={40}
                alt=""
              />
            ) : (
              <img
                src="/assets/imgs/menu-home.svg"
                className="me-2"
                width={40}
                alt=""
              />
            )}
            Home
          </MenuItem>
          <MenuItem
            className={location.pathname === "/roadmap" ? "active" : ""}
            component={<Link to="/roadmap" />}>
            {location.pathname === "/roadmap" ? (
              <img
                src="/assets/imgs/menu-roadmap-active.svg"
                className="me-2"
                width={40}
                alt=""
              />
            ) : (
              <img
                src="/assets/imgs/menu-roadmap.svg"
                className="me-2"
                width={40}
                alt=""
              />
            )}
            Roadmaps
          </MenuItem>
          <MenuItem
            className={location.pathname === "/dashboard" ? "active" : ""}
            component={<Link to="/dashboard" />}>
            {location.pathname === "/dashboard" ? (
              <img
                src="/assets/imgs/menu-dashboard-active.svg"
                className="me-2"
                width={40}
                alt=""
              />
            ) : (
              <img
                src="/assets/imgs/menu-dashboard.svg"
                className="me-2"
                width={40}
                alt=""
              />
            )}
            Dashboard
          </MenuItem>
          <MenuItem
            className={location.pathname === "/saved" ? "active" : ""}
            component={<Link to="/saved" />}>
            {location.pathname === "/saved" ? (
              <img
                src="/assets/imgs/menu-saved-active.svg"
                className="me-2"
                width={40}
                alt=""
              />
            ) : (
              <img
                src="/assets/imgs/menu-saved.svg"
                className="me-2"
                width={40}
                alt=""
              />
            )}
            Saved
          </MenuItem>
          <MenuItem
            className={location.pathname === "" ? "active" : ""}
            component={<Link to="" />}>
            {location.pathname === "" ? (
              <img
                src="/assets/imgs/community-active.png"
                className="me-2"
                width={40}
                alt=""
              />
            ) : (
              <img
                src="/assets/imgs/commnuity.png"
                className="me-2"
                width={40}
                alt=""
              />
            )}
            Commmunity
          </MenuItem>
          <MenuItem
            className={location.pathname === "" ? "active" : ""}
            component={<Link to="" />}>
            {location.pathname === "" ? (
              <img
                src="/assets/imgs/test-active.png"
                className="me-2"
                width={40}
                alt=""
              />
            ) : (
              <img
                src="/assets/imgs/test.png"
                className="me-2"
                width={40}
                alt=""
              />
            )}
            Test
          </MenuItem>
          <MenuItem
            className={location.pathname === "" ? "active" : ""}
            component={<Link to="" />}>
            {location.pathname === "" ? (
              <img
                src="/assets/imgs/caree-active.png"
                className="me-2"
                width={40}
                alt=""
              />
            ) : (
              <img
                src="/assets/imgs/career.png"
                className="me-2"
                width={40}
                alt=""
              />
            )}
            Career
          </MenuItem>
        </Menu>
        {!collapsed ? (
          <div className="assistantCardMain">
            <div className="assistantCard">
              <img src="/assets/imgs/asistant.svg" width={35} alt="" />
              <h1>Need Help?</h1>
              <p>Please check our docs</p>
              <button>Ask Assistant</button>
            </div>
            <div className="infoCard mt-3">
              <div className="d-flex gap-2 align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
                <div>
                  <div
                    className="d-flex gap-3 align-items-center justify-content-between"
                    style={{ paddingRight: 12 }}>
                    <h1>{user?.name}</h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={18}
                      height={18}
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPopup(true)}>
                      <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={20}
                      height={20}
                      style={{ cursor: "pointer" }}
                      onClick={handleLogout}>
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                    </svg>
                  </div>
                  <p>{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mobileAssistant">
            <img
              src="/assets/imgs/asistant.svg"
              className="mb-3"
              width={35}
              alt=""
            />
            <br />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={30}>
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </div>
        )}
      </Sidebar>
    </>
  );
}

export default ProSidebar;
