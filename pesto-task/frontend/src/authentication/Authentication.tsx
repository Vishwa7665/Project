import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const userAuth = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_SERVER}user-session-verify`,
        {}
      );
      const { status } = response.data;
      setIsLoggedIn(status);
      if (!status) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error occurred during user authentication:", error);
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    userAuth();
  }, []);

  return <>{isLoggedIn && <Outlet />}</>;
};

export default ProtectedRoute;
