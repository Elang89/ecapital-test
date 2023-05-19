import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import EmployeesPage from "./components/Employees/EmployeesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
