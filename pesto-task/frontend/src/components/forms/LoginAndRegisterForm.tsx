import axios from "axios";
import React, { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface LoginAndRegisterFormProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formType: string;
  formData: { email: string; password: string };
}

export const LoginAndRegisterForm: React.FC<LoginAndRegisterFormProps> = ({
  handleChange,
  handleSubmit,
  formData,
  formType,
}) => {
  const navigate = useNavigate();
  const navTo = () => {
    if (formType === "Login") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mt-4">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          className="form-control mt-2"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={handleChange}
        />
        <small
          id="emailHelp"
          className="form-text text-muted"
          style={{ fontSize: "12px" }}
        >
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group mt-4">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          className="form-control mt-2"
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button type="submit" className="btn btn-primary">
          {formType}
        </button>
      </div>
      <div className="mt-3" style={{ textAlign: "center" }}>
        <a className="link-primary" type="button" onClick={navTo}>
          {formType === "Login"
            ? "Don't have an account, register"
            : "Already have an account, login"}
        </a>
      </div>
    </form>
  );
};
