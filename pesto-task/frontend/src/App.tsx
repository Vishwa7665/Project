import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import ProtectedRoute from "./authentication/Authentication";
import axios from "axios";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./components/layout/Layout";
import { CreateTask } from "./pages/CreateTask";
import { TaskDetails } from "./pages/TaskDetails";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <Routes>
      <Route path="/login" element={<LoginPage formType="Login" />} />
      <Route path="/register" element={<LoginPage formType="Register" />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/task/:taskId" element={<TaskDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
