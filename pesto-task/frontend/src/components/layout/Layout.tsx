import axios from "axios";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  function toggleMenu() {
    setIsMenuOpen((prevState) => !prevState);
  }

  async function logOut() {
    try {
      const url = `${process.env.REACT_APP_BASE_URL_SERVER}user-logout`;
      const resp = await axios.post(url);
      if (resp.data.status) {
        navigate("/login");
      }
    } catch (error) {}
  }

  const toDashboard = () => {
    navigate("/");
  };

  const toCreateTask = () => {
    navigate("/create-task");
  };

  return (
    <div id="wrapper" className={isMenuOpen ? "toggled" : ""}>
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <h2>TaskMaster</h2>
        </div>
        <ul className="sidebar-nav">
          <li className="">
            <a type="button" onClick={toDashboard}>
              <i className="fa fa-home"></i>Dashboard
            </a>
          </li>
          <li>
            <a type="button" onClick={toCreateTask}>
              <i className="fa fa-plug"></i>Create Task
            </a>
          </li>
          <li style={{ marginLeft: "3.2rem", marginTop: "25rem" }}>
            <button className="btn btn-outline-danger" onClick={logOut}>
              Log out
            </button>
          </li>
        </ul>
      </aside>

      <div id="navbar-wrapper">
        <nav className="sticky navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                className="navbar-brand"
                style={{ padding: "0 7px", border: "1px solid #dadada" }}
                id="sidebar-toggle"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                  style={{ verticalAlign: "unset" }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      <section id="content-wrapper">
        <div className="row">
          <div className="col-lg-12">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
};
