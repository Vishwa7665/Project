import React, { ChangeEvent, FormEvent, Fragment, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginAndRegisterForm } from "../components/forms/LoginAndRegisterForm";

interface FormData {
  email: string;
  password: string;
}

interface LoginPageProps {
  formType: "Login" | "Register";
}

export const LoginPage: React.FC<LoginPageProps> = ({ formType }) => {
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const url =
        formType === "Login"
          ? `${process.env.REACT_APP_BASE_URL_SERVER}user-login`
          : `${process.env.REACT_APP_BASE_URL_SERVER}user-register`;

      const response = await axios.post(url, formData);
      console.log(response.data);
      if (response.data.status) {
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const checkIfUserIsLoggedIn = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_SERVER}user-session-verify`,
        {}
      );

      if (response.data.status) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <Fragment>
      <div className="row col-12">
        <div className="col-md-4 mx-auto mt-5">
          <div className="card mt-5" style={{ padding: "30px" }}>
            <p className="heading-font d-flex justify-content-center">
              {formType}
            </p>
            <LoginAndRegisterForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              formData={formData}
              formType={formType}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
