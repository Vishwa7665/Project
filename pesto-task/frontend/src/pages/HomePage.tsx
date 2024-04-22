import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { TaskCard } from "../components/cards/TaskCard";
import { useNavigate } from "react-router-dom";

interface Task {
  title: string;
  description: string;
  status: string;
  id: string;
  created_at: string;
}

export const HomePage = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [filteredData, setFilteredData] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL_SERVER}task-data`;
      const response = await axios.get(url);
      if (response.status === 200) {
        setTaskData(response.data.data);
        setFilteredData(response.data.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    searchData(searchTerm);
  };

  const searchData = (term: string) => {
    const filteredData = taskData.filter((task) =>
      Object.values(task)
        .map((value) => value.toString().toLowerCase())
        .some((value) => value.includes(term))
    );
    setFilteredData(filteredData);
  };

  const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    if (status === "All") {
      setFilteredData(taskData);
    } else {
      searchData(status.toLowerCase());
    }
  };

  const createTask = () => {
    navigate("/create-task");
  };

  return (
    <Fragment>
      {taskData.length ? (
        <div className="container">
          <div className="dashboard-top-bar">
            <div className="wrapper">
              <div className="searchBar">
                <input
                  id="searchQueryInput"
                  name="searchQueryInput"
                  type="text"
                  placeholder="Search Task"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="select-dropdown">
              <select onChange={handleDropdown}>
                <option value="All">All</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
          <div className="row card-grid">
            {filteredData.map((task) => (
              <TaskCard key={task.id} {...task} />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="row col-5 card mb-5"
          style={{ margin: "auto", marginTop: "5rem", padding: "30px" }}
        >
          <h2 className="heading-font mt-4 mb-4">
            You haven't created any tasks yet. Click the button below to create
            a new task.
          </h2>
          <button
            className="btn btn-outline-primary mb-4"
            style={{ padding: "10px 20px" }}
            onClick={createTask}
          >
            Create Task
          </button>
        </div>
      )}
    </Fragment>
  );
};
