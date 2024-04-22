import React, { Fragment } from "react";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  status: string;
  id: string;
  created_at: string;
}

export const TaskCard: React.FC<CardProps> = ({
  id,
  title,
  description,
  status,
  created_at,
}) => {
  const navTo = {
    pathname: `/task/${id}`,
  };
  return (
    <Fragment>
      <div className="card col-4">
        <Link to={navTo} style={{ textDecoration: "none", color: "black" }}>
          <div
            className="card-body"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <h5 className="card-title">{title}</h5>
            <p
              className="card-text task-card-multiline"
              style={{ wordBreak: "break-all", wordWrap: "break-word" }}
            >
              {description}
            </p>
            <span
              className="badge p-3"
              style={{ fontSize: "18px", backgroundColor: "#52afa4c4" }}
            >
              Status: {status}
            </span>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};
