import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

export const CreateTask = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    status: "To Do",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    title: "",
    description: "",
    status: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    setMessage(() => "");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm(formValues);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Prevent form submission if errors exist
    }

    try {
      const url = `${process.env.REACT_APP_BASE_URL_SERVER}task-data`;
      const response = await axios.post(url, formValues);
      if (response.data.status) {
        setMessage("Task successfully added.");
        setFormValues((val) => ({
          ...val,
          title: "",
          description: "",
          status: "",
        }));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Some error happened");
    }
  };

  const validateForm = (values: typeof formValues) => {
    const errors: { [key: string]: string } = {};
    if (!values.title.trim()) {
      errors.title = "Title is required";
    }
    if (!values.description.trim()) {
      errors.description = "Description is required";
    }
    if (!values.status.trim()) {
      errors.status = "Status is required";
    }
    return errors;
  };

  return (
    <div className="container col-12">
      <div
        className="col-lg-4 card mt-5"
        style={{ margin: "auto", padding: "20px" }}
      >
        <h4
          className="create-task-heading mb-3 mt-3"
          style={{ textAlign: "center" }}
        >
          Create New Task
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-4">
            <label htmlFor="formControlInput1">Title</label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleInputChange}
              className={`form-control ${errors.title && "is-invalid"}`}
              id="formControlInput1"
              placeholder="e.g. Dashboard Task"
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>
          <div className="form-group mt-4">
            <label htmlFor="formControlSelect">Select status</label>
            <select
              className={`form-control ${errors.status && "is-invalid"}`}
              id="formControlSelect"
              name="status"
              value={formValues.status}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.status && (
              <div className="invalid-feedback">{errors.status}</div>
            )}
          </div>

          <div className="form-group mt-4 mb-4">
            <label htmlFor="formControlTextarea">Description</label>
            <textarea
              className={`form-control ${errors.description && "is-invalid"}`}
              id="formControlTextarea"
              rows={4}
              placeholder="e.g. Create a dashboard which provides an overview of all tasks currently assigned to the user."
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>
          <div className="mt-4 d-flex flex-wrap justify-content-center">
            <button className="btn btn-primary" type="submit">
              Create Task
            </button>
          </div>
          {message && <div className="success-message">{message}</div>}
        </form>
      </div>
    </div>
  );
};
