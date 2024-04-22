import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface Task {
  title: string;
  description: string;
  status: string;
  created_at: string;
}

export const TaskDetails = () => {
  const [taskDetails, setTaskDetails] = useState<Task>({
    title: "",
    description: "",
    status: "",
    created_at: "",
  });
  const [createdAt, setCreatedAt] = useState("");
  const params = useParams();
  const taskId = params.taskId;
  const navigate = useNavigate();

  useEffect(() => {
    getTaskData();
  }, []);

  const formatDate = (date: string) => {
    const formattedDate = new Date(date).toDateString();
    return formattedDate;
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const status = e.target.value;
    try {
      const url = `${process.env.REACT_APP_BASE_URL_SERVER}task-data/${taskId}`;
      const response = await axios.put(url, { status });
      if (response.status === 200) {
        getTaskData();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const getTaskData = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL_SERVER}task-data/${taskId}`;
      const resp = await axios.get(url);
      if (resp.data.status) {
        const taskData = resp.data.data;
        setTaskDetails(taskData);
        setCreatedAt(formatDate(taskData.created_at));
      } else {
        alert(resp.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const deleteTask = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL_SERVER}task-data/${taskId}`;
      const resp = await axios.delete(url);
      if (resp.data.status) {
        alert(resp.data.message);
        navigate("/");
      } else {
        alert(resp.data.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Fragment>
      <div className="container row">
        <div
          className="col-8 card"
          style={{ margin: "auto", marginTop: "4rem", marginBottom: "4rem" }}
        >
          <div className="task-title mt-4 mb-2">{taskDetails.title}</div>
          <hr />
          <div className="row mt-4">
            <div
              className="col-lg-5"
              style={{ margin: "auto", fontSize: "18px", fontWeight: "500" }}
            >
              Description
            </div>
            <div
              className="col-lg-5 task-description"
              style={{ margin: "auto" }}
            >
              {taskDetails.description}
            </div>
          </div>
          <div className="row mt-4">
            <div
              className="col-lg-5"
              style={{ margin: "auto", fontSize: "18px", fontWeight: "500" }}
            >
              Status
            </div>
            <div
              className="col-lg-2 task-description"
              style={{ margin: "auto" }}
            >
              {taskDetails.status}
            </div>
            <div className="col-lg-3">
              <label
                style={{
                  fontSize: "12px",
                  marginBottom: "2px",
                  fontWeight: "500",
                }}
              >
                Change Status
              </label>
              <select
                className="form-control"
                id="formControlSelect"
                defaultValue="Change Status"
                name="status"
                value={taskDetails.status}
                onChange={handleStatusChange}
              >
                <option value="" disabled>
                  Change status
                </option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
          <div className="row mt-4 mb-5">
            <div
              className="col-lg-5"
              style={{ margin: "auto", fontSize: "18px", fontWeight: "500" }}
            >
              Created At
            </div>
            <div
              className="col-lg-5 task-description"
              style={{ margin: "auto" }}
            >
              {createdAt}
            </div>
          </div>
          <div className="mb-5" style={{ margin: "auto" }}>
            <button className="btn btn-outline-danger" onClick={deleteTask}>
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
